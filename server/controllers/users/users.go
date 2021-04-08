package users

import (
	"admin/controllers"
	"admin/models/user"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type UpdateUserData struct {
	User            user.User `json:"user"`
	Password        string    `json:"password"`
	ConfirmPassword string    `json:"confirmPassword"`
	UpdatePassword  bool      `json:"updatePassword"`
}

func GetUserController(c *fiber.Ctx) error {
	user := user.User{Email: c.Get("email")}

	if err := user.Find(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "",
		Success: true,
		Data:    user,
	})
}

func GetUsersController(c *fiber.Ctx) error {
	users, err := user.All()

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "",
		Success: true,
		Data:    users,
	})
}

func UpdateUserController(c *fiber.Ctx) error {
	var body UpdateUserData

	if err := c.BodyParser(&body); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	body.User.Password = body.Password
	body.User.ConfirmPassword = body.ConfirmPassword

	if err := body.User.Update(body.UpdatePassword); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "user has been updated",
		Success: true,
		Data:    nil,
	})
}

func DeleteUserController(c *fiber.Ctx) error {
	id, err := strconv.ParseInt(c.Params("id"), 10, 64)

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	user := user.User{ID: id}
	if err := user.Delete(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "user has been deleted",
		Success: true,
		Data:    nil,
	})
}
