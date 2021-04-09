package utils

import (
	"errors"
	"fmt"
	"regexp"
	"strconv"
)

var emailRegex = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

// isEmailValid checks if the email provided passes the required structure and length.
func ValidateEmail(e string) bool {
	if len(e) < 3 && len(e) > 254 {
		return false
	}
	return emailRegex.MatchString(e)
}

func PermissionApproval(required int64, attainedAsString string) error {
	attained, err := strconv.ParseInt(attainedAsString, 10, 64)

	if err != nil {
		return err
	}

	if attained >= required {
		return nil
	}

	fmt.Println("Permission Denied")
	return errors.New("you do not have the nessecary privileges to perform that action")
}
