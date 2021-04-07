package image

import (
	"admin/database"
	"admin/utils"
	"errors"
	"fmt"
	"time"
)

type IMG struct {
	ID        int64     `json:"id"`
	URL       string    `json:"url"`
	Date      time.Time `json:"date"`
	PostID    int64     `json:"post_id"`
	Thumbnail int8      `json:"thumbnail"`
}

func (i *IMG) GetImageWithID() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	row := db.QueryRow("SELECT * FROM images WHERE id = ?", i.ID)

	if err := row.Scan(
		&i.ID,
		&i.URL,
		&i.Date,
		&i.PostID,
		&i.Thumbnail,
	); err != nil {
		return err
	}

	return nil
}

// SaveNewImage creates a new row in mysql
func (i *IMG) SaveNewImage(updateThumbnail bool) error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	if len(i.URL) < 10 {
		return errors.New("url too short")
	}

	result, err := db.Exec(
		"INSERT INTO images (url, post_id) VALUES (?, ?)",
		i.URL, i.PostID)

	if err != nil {
		fmt.Printf("Err When Saving Img %v\n", err)
		return err
	}

	ImageID, err := result.LastInsertId()

	if err != nil {
		return err
	}
	i.ID = ImageID

	if updateThumbnail {
		result, err = db.Exec(
			"UPDATE posts SET thumbnail = ? WHERE id = ?",
			i.ID, i.PostID)

		if err != nil {
			return err
		}

		if err := utils.OnResult(result); err != nil {
			return utils.OnResult(result)
		}
	}

	if err != nil {
		return err
	}

	return nil
}

func (i *IMG) DeleteOneWithID() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	result, err := db.Exec("DELETE FROM images WHERE id = ?", i.ID)

	if err != nil {
		return err
	}

	return utils.OnResult(result)
}

func GetImageIDs() ([]int64, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	rows, err := db.Query("SELECT id FROM IMAGES")
	var ids []int64

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var id int64

		if err := rows.Scan(&id); err != nil {
			return nil, err
		}

		ids = append(ids, id)
	}

	return ids, nil
}

func GetAllImages() ([]IMG, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	var images []IMG
	rows, err := db.Query("SELECT * FROM images")

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var img IMG

		if err := rows.Scan(
			&img.ID,
			&img.URL,
			&img.Date,
			&img.PostID,
			&img.Thumbnail,
		); err != nil {
			return nil, err
		}

		images = append(images, img)
	}

	return images, nil
}

func GetImagesWithPostID(postID int64) ([]IMG, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	var images []IMG
	rows, err := db.Query("SELECT * FROM images WHERE post_id = ?", postID)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var img IMG

		if err := rows.Scan(
			&img.ID,
			&img.URL,
			&img.Date,
			&img.PostID,
			&img.Thumbnail,
		); err != nil {
			return nil, err
		}

		images = append(images, img)
	}

	return images, nil
}

func GetPlaceholder() IMG {
	return IMG{
		ID:        0,
		URL:       "http://localhost:8084/public/images/placeholder.png",
		Date:      time.Now().UTC(),
		PostID:    0,
		Thumbnail: 1,
	}
}
