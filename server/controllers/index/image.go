package index

import (
	"admin/controllers"
	"admin/models/image"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func ImageGETController(c *fiber.Ctx) error {
	id, err := strconv.ParseInt(c.Params("id"), 10, 64)

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	img := image.IMG{ID: id}

	if err := img.GetImageWithID(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: fmt.Sprintf("%v", err),
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: "",
		Success: true,
		Data:    img,
	})
}

func ImagesGETController(c *fiber.Ctx) error {
	images, err := image.GetAllImages()

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
		Data:    images,
	})
}
