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
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	user := user.User{Email: c.Get("email")}

	if err := user.Find(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to find user",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "found one user",
		Success: true,
		Data:    user,
	})
}

func GetUsersController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(0, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	users, err := user.All()

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "found zero users",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: fmt.Sprintf("found %d users", len(users)),
		Success: true,
		Data:    users,
	})
}

func SetAdminController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(3, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	var user user.User

	if err := c.BodyParser(&user); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "invalid parameter received or user settings have been modified",
			Success: false,
			Data:    nil,
		})
	}

	if err := user.SetAdmin(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "make sure you have filled out every field",
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

func UpdateUserController(c *fiber.Ctx) error {
	var data user.UpdateUserData

	if err := c.BodyParser(&data); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "make sure you have filled out every field",
			Success: false,
			Data:    nil,
		})
	}

	if err := utils.PermissionApproval(3, c.Get("attained")); err != nil {

		if c.Get("email") == data.OldData.Email {
			// do whatever full permission granted

			if err := data.Update(); err != nil {
				return c.JSON(controllers.HTTPResponse{
					Message: "invalid parameter received",
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
				Message: "you lack the nessecary privileges to perform that action",
				Success: false,
				Data:    nil,
			})
		}

	} else {
		// do whatever full permission granted
		if err := data.Update(); err != nil {
			return c.JSON(controllers.HTTPResponse{
				Message: "invalid parameter received",
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
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	id, err := strconv.ParseInt(c.Params("id"), 10, 64)

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "invalid parameter received",
			Success: false,
			Data:    nil,
		})
	}

	user := user.User{ID: id}
	if err := user.Delete(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to delete user",
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
