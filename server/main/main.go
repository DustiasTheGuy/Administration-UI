package main

import (
	"admin/controllers"
	"admin/controllers/index"
	"admin/models/user"
	"admin/utils"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

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

	user := user.User{Email: claim.Email}
	user.Find()

	c.Request().Header.Add("email", user.Email)
	c.Request().Header.Add("attained", fmt.Sprintf("%d", user.Admin))

	return c.Next()
}

func main() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	app := fiber.New(fiber.Config{
		Immutable: true,
	})

	app.Use(cors.New())
	app.Static("/public", "./public")

	app.Post("/login", index.LoginController)
	app.Post("/register", index.RegisterController)

	UsersRouter(app.Group("/api/users", jwtMiddleware))
	ServicesRouter(app.Group("/api/services", jwtMiddleware))
	ImageRouter(app.Group("/api/image", jwtMiddleware))
	PostRouter(app.Group("/api/post", jwtMiddleware))

	log.Fatal(app.Listen(":8084"))
}
