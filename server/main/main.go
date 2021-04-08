package main

import (
	"admin/controllers"
	"admin/controllers/image"
	"admin/controllers/index"
	"admin/controllers/post"
	"admin/controllers/services"
	"admin/controllers/users"
	"admin/utils"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New(fiber.Config{
		Immutable: true,
	})
	app.Use(cors.New())
	app.Static("/public", "./public") // serve static files from /public folder

	app.Post("/login", index.LoginController)
	app.Post("/register", index.RegisterController)

	usersRouter := app.Group("/api/users", jwtMiddleware)
	servicesRouter := app.Group("/api/services", jwtMiddleware)
	imageRouter := app.Group("/api/image", jwtMiddleware)
	postRouter := app.Group("/api/post", jwtMiddleware)

	usersRouter.Get("/get-users", users.GetUsersController)
	usersRouter.Put("/update-user", users.UpdateUserController)
	usersRouter.Delete("/delete-user/:id", users.DeleteUserController)
	usersRouter.Get("/profile", users.GetUserController)

	servicesRouter.Get("/start/:service", services.StartServiceController)
	servicesRouter.Get("/stop/:pid", services.StopServiceController)
	servicesRouter.Get("/get-processes", services.GetProcessesController)

	imageRouter.Get("/images", image.ImagesGETController)
	imageRouter.Post("/upload", image.UploadImageController)
	imageRouter.Delete("/delete-image/:id", image.DeleteOneImageController)
	imageRouter.Get("/image-ids", image.GetImageIDsController)
	imageRouter.Get("/image/:id", image.ImageGETController)

	postRouter.Post("/publish", post.PublishController)
	postRouter.Get("/get-post/:id", post.FindOnePostController)
	postRouter.Get("/get-posts", post.FindAllPostsController)
	postRouter.Delete("/delete-post/:id", post.DeleteOnePostController)
	postRouter.Put("/update-post", post.UpdateOnePostController)

	log.Fatal(app.Listen(":8084"))
}

func jwtMiddleware(c *fiber.Ctx) error {
	claims := utils.GetClaims()
	claim, err := claims.ValidateToken(c.Get("authorization"))

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "Unable to parse token",
			Success: false,
			Data:    nil,
		})
	}

	if err := claim.Valid(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "Token Invalid",
			Success: false,
			Data:    nil,
		})
	}

	c.Request().Header.Add("email", claim.Email)
	return c.Next()
}
