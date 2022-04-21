package main

import (
	"admin/controllers/post"

	"github.com/gofiber/fiber/v2"
)

func PostRouter(r fiber.Router) {
	r.Post("/publish", post.PublishController)
	r.Get("/get-post/:id", post.FindOnePostController)
	r.Get("/get-posts", post.FindAllPostsController)
	r.Delete("/delete-post/:id", post.DeleteOnePostController)
	r.Put("/update-post", post.UpdateOnePostController)

}
