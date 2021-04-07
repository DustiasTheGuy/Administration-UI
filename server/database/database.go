package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// SQLConfig is required when creating a new database connection. After a connection has been established call close the connection
// to prevent too many active connections
type SQLConfig struct {
	User     string
	Password string
	Database string
}

// Connect to mysql and DO NOT forget to close the connection before sending a response to client
func Connect(config *SQLConfig) *sql.DB {
	connectionURI := fmt.Sprintf("%s:%s@/%s?parseTime=true", config.User, config.Password, config.Database)

	db, err := sql.Open("mysql", connectionURI)
	if err != nil { // most likely the SQL config was faulty
		panic(err)
	}

	// See "Important settings" section.
	db.SetConnMaxLifetime(time.Minute * 3) // a connection can only be active for 3 minutes
	db.SetMaxOpenConns(10)                 // if this exceeds the server will panic and stop
	db.SetMaxIdleConns(10)                 // connection pool, so close the connection when it's not being used anymore

	return db // can be used to execute SQL queries
}
