package utils

import (
	"database/sql"
	"errors"
)

func OnResult(result sql.Result) error {
	RowsAffected, err := result.RowsAffected()

	if err != nil {
		return err
	}

	if RowsAffected == 0 {
		return errors.New("zero changes has occured")
	}

	return nil
}
