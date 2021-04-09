package post

import (
	"admin/controllers"
	"admin/models/post"
	"admin/models/user"
	"admin/utils"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func PublishController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(2, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	var publishData post.Post
	user := user.User{Email: c.Get("email")}

	if err := user.Find(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to find user, user may have been deleted or user details may have been changed",
			Success: false,
			Data:    nil,
		})
	}

	if err := c.BodyParser(&publishData); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to parse data, please make sure you have filled out every field",
			Success: false,
			Data:    nil,
		})
	}

	publishData.UserID = user.ID
	if err := publishData.Save(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to save post, make sure every field is filled out",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "post has been saved",
		Success: true,
		Data:    nil,
	})
}

func UpdateOnePostController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(2, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	var post post.Post

	if err := c.BodyParser(&post); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to parse body, make sure every field is filled out",
			Success: false,
			Data:    nil,
		})
	}

	if err := post.Update(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "update has failed, make sure every field is filled out correctly",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "post has been updated",
		Success: true,
		Data:    post,
	})
}

func DeleteOnePostController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(2, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	id, err := strconv.ParseInt(c.Params("id"), 10, 64)

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "invalid parameter received, post may have been modified or deleted",
			Success: false,
			Data:    nil,
		})
	}

	post := post.Post{ID: id}
	if err := post.Delete(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "post could not be deleted, it may have been moved or already delted",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "post has been deleted",
		Success: true,
		Data:    nil,
	})
}

func FindAllPostsController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(0, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	posts, err := post.All()

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "found zero posts",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: fmt.Sprintf("found %d posts", len(posts)),
		Success: true,
		Data:    posts,
	})
}

func FindOnePostController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(0, c.Get("attained")); err != nil {
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

	post := post.Post{ID: id}
	post.Find()

	return c.JSON(controllers.HTTPResponse{
		Message: "found one post",
		Success: true,
		Data:    post,
	})
}
