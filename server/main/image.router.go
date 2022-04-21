package main

import (
	"admin/controllers/image"

	"github.com/gofiber/fiber/v2"
)

func ImageRouter(r fiber.Router) {
	r.Get("/images", image.ImagesGETController)
	r.Post("/upload", image.UploadImageController)
	r.Delete("/delete-image/:id", image.DeleteOneImageController)
	r.Get("/image-ids", image.GetImageIDsController)
	r.Get("/image/:id", image.ImageGETController)
}
