package index

import (
	"admin/controllers"
	"admin/models/user"

	"github.com/gofiber/fiber/v2"
)

func LoginController(c *fiber.Ctx) error {
	var body map[string]string

	if err := c.BodyParser(&body); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "please make sure you filled out every field",
			Success: false,
			Data:    nil,
		})
	}

	user := user.User{
		Email:    body["email"],
		Password: body["password"],
	}

	jwt, err := user.Login()

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "session could not be created",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "session successfully created",
		Success: true,
		Data:    jwt,
	})
}
