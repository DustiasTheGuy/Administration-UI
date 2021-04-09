package users

import (
	"admin/controllers"
	"admin/models/user"
	"admin/utils"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetUserController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(0, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

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
	if err := utils.PermissionApproval(0, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

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

/*
{
	config: {
		"editPassword": true
	},
	newData: {
		"email": "8marko.kiavynhoc611251251251@openswan.net",
		"password": "password12345",
		"confirmPassword": "password12345"
	},
	oldData: {
		"id": 4,
		"email": "8marko.kiavynhoc6@openswan.net",
		"created": "2021-04-01T04:00:40Z",
		"admin": 0
	}
}
*/

func UpdateUserController(c *fiber.Ctx) error {
	var data user.UpdateUserData

	if err := c.BodyParser(&data); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	if err := utils.PermissionApproval(3, c.Get("attained")); err != nil {

		if c.Get("email") == data.OldData.Email {
			// do whatever full permission granted

			if err := data.Update(); err != nil {
				return c.JSON(controllers.HTTPResponse{
					Message: fmt.Sprintf("%v", err),
					Success: false,
					Data:    nil,
				})
			}

			return c.JSON(controllers.HTTPResponse{
				Message: "account updated",
				Success: true,
				Data:    nil,
			})

		} else {
			return c.JSON(controllers.HTTPResponse{
				Message: fmt.Sprintf("%v", err),
				Success: false,
				Data:    nil,
			})
		}

	} else {
		// do whatever full permission granted
		if err := data.Update(); err != nil {
			return c.JSON(controllers.HTTPResponse{
				Message: fmt.Sprintf("%v", err),
				Success: false,
				Data:    nil,
			})
		}

		return c.JSON(controllers.HTTPResponse{
			Message: "account updated",
			Success: true,
			Data:    nil,
		})
	}

}

func DeleteUserController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(3, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

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
