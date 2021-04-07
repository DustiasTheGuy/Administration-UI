package main

import (
	"admin/controllers"
	"admin/controllers/index"
	"admin/controllers/users"
	"admin/utils"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New(fiber.Config{Immutable: true})
	app.Use(cors.New())
	app.Static("/public", "./public") // serve static files from /public folder

	app.Post("/login", index.LoginController)
	app.Post("/register", index.RegisterController)
	app.Get("/image/:id", index.ImageGETController)
	app.Get("/images", index.ImagesGETController)

	usersRouter := app.Group("/users", usersMiddleware)
	usersRouter.Get("/start/:service", users.StartServiceController)
	usersRouter.Get("/stop/:pid", users.StopServiceController)
	usersRouter.Get("/get-processes", users.GetProcessesController)
	usersRouter.Get("/profile", users.GetUserController)
	usersRouter.Post("/publish", users.PublishController)
	usersRouter.Post("/upload", users.UploadImageController)
	usersRouter.Delete("/delete-image/:id", users.DeleteOneImageController)
	usersRouter.Get("/image-ids", users.GetImageIDsController)

	usersRouter.Get("/get-post/:id", users.FindOnePostController)
	usersRouter.Get("/get-posts", users.FindAllPostsController)
	usersRouter.Delete("/delete-post/:id", users.DeleteOnePostController)
	usersRouter.Put("/update-post", users.UpdateOnePostController)

	usersRouter.Get("/get-users", users.GetUsersController)
	usersRouter.Put("/update-user", users.UpdateUserController)
	usersRouter.Delete("/delete-user/:id", users.DeleteUserController)

	log.Fatal(app.Listen(":8084"))
}

func usersMiddleware(c *fiber.Ctx) error {
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
