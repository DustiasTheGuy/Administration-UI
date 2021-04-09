package user

import (
	"admin/database"
	"admin/utils"
	"errors"
	"time"
)

type User struct {
	ID              int64     `json:"id"`
	Email           string    `json:"email"`
	Password        string    `json:"-"`
	ConfirmPassword string    `json:"-"`
	Created         time.Time `json:"created"`
	Admin           int8      `json:"admin"`
}

func (u *User) Login() (string, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	var user User
	row := db.QueryRow("SELECT * FROM users WHERE email = ?", u.Email)

	if err := row.Scan(
		&user.ID,
		&user.Email,
		&user.Password,
		&user.Created,
		&user.Admin); err != nil {
		return "", err
	}

	if !utils.ComparePassword(user.Password, u.Password) {
		return "", errors.New("passwords do not match")
	}

	claims := utils.GetClaims()

	token, err := claims.GenerateToken(user.Email)

	if err != nil {
		return "", err
	}

	return token, nil
}

func (u *User) Register() error {
	if len(u.Email) <= 10 {
		return errors.New("email must be at least 10 characters")
	} else if len(u.Password) <= 10 {
		return errors.New("password must be at least 10 characters")
	} else if u.Password != u.ConfirmPassword {
		return errors.New("password do not match")
	} else if !utils.ValidateEmail(u.Email) {
		return errors.New("email validation failed")
	}

	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	hash, err := utils.HashPassword(u.Password)

	if err != nil {
		return err
	}

	result, err := db.Exec("INSERT INTO users (email, password) VALUES(?, ?)", u.Email, hash)

	if err != nil {
		return err
	}

	return utils.OnResult(result)
}

// find one row with email
func (u *User) Find() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	row := db.QueryRow("SELECT id, created, admin FROM users WHERE email = ?", u.Email)

	if err := row.Scan(
		&u.ID,
		&u.Created,
		&u.Admin,
	); err != nil {
		return err
	}

	return nil
}

// find all users
func All() ([]User, error) {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	rows, err := db.Query("SELECT id, email, created, admin FROM users")

	if err != nil {
		return nil, err
	}

	var users []User

	for rows.Next() {
		var user User

		if err := rows.Scan(
			&user.ID,
			&user.Email,
			&user.Created,
			&user.Admin); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

// delete a single row in database
func (u *User) Delete() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	result, err := db.Exec("DELETE FROM users WHERE id = ?", u.ID)

	if err != nil {
		return err
	}

	return utils.OnResult(result)
}

// update a single row
func (u *UpdateUserData) Update() error {
	db := database.Connect(&database.SQLConfig{
		User:     "root",
		Password: "password",
		Database: "isak_tech_admin",
	})
	defer db.Close()

	if u.Config.EditPassword {

		if u.NewData.Password != u.NewData.ConfirmPassword {
			return errors.New("passwords do not match")
		} else {
			hash, err := utils.HashPassword(u.NewData.Password)

			if err != nil {
				return err
			}

			result, err := db.Exec("UPDATE users SET email = ?, password = ? WHERE id = ?", u.NewData.Email, hash, u.OldData.ID)

			if err != nil {
				return err
			}

			return utils.OnResult(result)
		}

	} else {
		result, err := db.Exec("UPDATE users SET email = ? WHERE id = ?", u.NewData.Email, u.OldData.ID)

		if err != nil {
			return err
		}

		return utils.OnResult(result)
	}
}

type UpdateUserConfig struct {
	EditPassword bool `json:"editPassword"`
}

type UpdateUserNewData struct {
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type UpdateUserData struct {
	Config  UpdateUserConfig  `json:"config"`
	NewData UpdateUserNewData `json:"newData"`
	OldData User              `json:"oldData"`
}
