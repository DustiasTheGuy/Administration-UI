package main

import (
	"admin/controllers/users"

	"github.com/gofiber/fiber/v2"
)

func UsersRouter(r fiber.Router) {
	r.Get("/get-users", users.GetUsersController)
	r.Put("/update-user", users.UpdateUserController)
	r.Put("/set-admin", users.SetAdminController)
	r.Delete("/delete-user/:id", users.DeleteUserController)
	r.Get("/profile", users.GetUserController)
}
