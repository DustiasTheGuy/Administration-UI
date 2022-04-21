package main

import (
	"admin/controllers/services"

	"github.com/gofiber/fiber/v2"
)

func ServicesRouter(r fiber.Router) {
	r.Get("/start/:service", services.StartServiceController)
	r.Get("/stop/:pid", services.StopServiceController)
	r.Get("/get-processes", services.GetProcessesController)
}
