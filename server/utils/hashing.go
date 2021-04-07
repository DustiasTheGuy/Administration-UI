package utils

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// HashPassword generates a hash from a string
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 4)

	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

// ComparePassword compares a hash and a string and checks the validity
func ComparePassword(savedPassword string, password string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(savedPassword), []byte(password)); err != nil {
		fmt.Println(err)
		return false
	}

	return true
}
