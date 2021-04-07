package post

import (
	"admin/database"
	"admin/models/image"
	"admin/utils"
	"errors"
	"fmt"
	"time"
)

type Post struct {
	ID        int64       `json:"id"`
	Post      string      `json:"body"`
	Title     string      `json:"title"`
	Category  string      `json:"category"`
	Date      time.Time   `json:"created"`
	UserID    int64       `json:"user_id"`
	Archived  int8        `json:"archived"`
	Thumbnail int64       `json:"thumbnail"`
	Images    []image.IMG `json:"images"`
}

func (p *Post) SavePost() error {
	if len(p.Post) < 10 {
		return errors.New("missing Field - Post")
	} else if len(p.Title) < 10 {
		return errors.New("missing Field - Title")
	} else if len(p.Category) < 4 {
		return errors.New("missing Field - Category")
	} else if p.Thumbnail < 0 {
		return errors.New("thumbnail must be a positive number")
	}

	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	result, err := db.Exec("INSERT INTO posts (post, title, category, user_id, thumbnail) VALUES(?, ?, ?, ?, ?)",
		p.Post,
		p.Title,
		p.Category,
		p.UserID,
		p.Thumbnail,
	)

	if err != nil {
		return err
	}

	return utils.OnResult(result)
}

func (p *Post) FindOnePost() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	row := db.QueryRow("SELECT * FROM posts WHERE id = ?", p.ID)

	if err := row.Scan(
		&p.ID,
		&p.Post,
		&p.Title,
		&p.Category,
		&p.Date,
		&p.UserID,
		&p.Archived,
		&p.Thumbnail,
	); err != nil {
		return err
	}

	p.GetPostImages()
	return nil
}

func FindAllPosts() ([]Post, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	rows, err := db.Query("SELECT * FROM posts")

	if err != nil {
		return nil, err
	}

	var posts []Post
	for rows.Next() {
		var post Post

		if err := rows.Scan(
			&post.ID,
			&post.Post,
			&post.Title,
			&post.Category,
			&post.Date,
			&post.UserID,
			&post.Archived,
			&post.Thumbnail,
		); err != nil {
			return nil, err
		}

		post.GetPostImages()
		posts = append(posts, post)
	}

	return posts, nil
}

func (p *Post) DeleteOnePost() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	result, err := db.Exec("DELETE FROM posts WHERE id = ?", p.ID)

	if err != nil {
		return err
	}

	return utils.OnResult(result)
}

func (p *Post) UpdateOnePost() error {
	fmt.Println(p)

	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech",
	})
	defer db.Close()

	result, err := db.Exec(
		`UPDATE posts SET post = ?, title = ?, category = ?, thumbnail = ?, archived = ? WHERE id = ?`,
		p.Post, p.Title, p.Category, p.Thumbnail, p.Archived, p.ID)

	if err != nil {
		return err
	}

	return utils.OnResult(result)
}

func (p *Post) GetPostImages() {
	img := image.IMG{ID: p.Thumbnail}
	err := img.GetImageWithID()

	if err != nil {
		p.Images = append(p.Images, image.GetPlaceholder())
	} else {
		p.Images = append(p.Images, img)
	}

	images, err := image.GetImagesWithPostID(p.ID)
	if err == nil {
		p.Images = append(p.Images, images...)
	}
}
