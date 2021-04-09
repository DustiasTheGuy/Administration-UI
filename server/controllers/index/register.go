package index

import (
	"admin/controllers"
	"admin/models/user"

	"github.com/gofiber/fiber/v2"
)

func RegisterController(c *fiber.Ctx) error {
	var body map[string]string

	if err := c.BodyParser(&body); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "please make sure you filled out every field",
			Success: false,
			Data:    nil,
		})
	}

	user := user.User{
		Email:           body["email"],
		Password:        body["password"],
		ConfirmPassword: body["confirmPassword"],
	}

	if err := user.Register(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "missing field or invalid data received",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "your account has been created",
		Success: true,
		Data:    nil,
	})
}
