package index

import (
	"admin/controllers"
	"admin/models/user"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func RegisterController(c *fiber.Ctx) error {
	var body map[string]string

	if err := c.BodyParser(&body); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "Unable to parse body",
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
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "Your account has been created",
		Success: true,
		Data:    nil,
	})
}
