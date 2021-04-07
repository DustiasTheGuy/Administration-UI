package index

import (
	"admin/controllers"
	"admin/models/user"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func LoginController(c *fiber.Ctx) error {
	var body map[string]string

	if err := c.BodyParser(&body); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "Unable to parse body",
			Success: false,
			Data:    nil,
		})
	}

	user := user.User{
		Email:    body["email"],
		Password: body["password"],
	}

	fmt.Println(user)

	jwt, err := user.Login()

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
		Data:    jwt,
	})
}
