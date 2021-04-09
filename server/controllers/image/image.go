package image

import (
	"admin/controllers"
	"admin/models/image"
	"admin/utils"
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func UploadImageController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(1, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	var images []image.IMG
	mpartForm, err := c.MultipartForm()

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to parse data",
			Success: false,
			Data:    nil,
		})
	}

	PostID, err := strconv.ParseInt(mpartForm.Value["post_id"][0], 10, 64)

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "invalid parameter received",
			Success: false,
			Data:    nil,
		})
	}

	for i := 0; i < len(mpartForm.File["file"]); i++ {
		rand.Seed(time.Now().UnixNano())  // seed the rand
		file := mpartForm.File["file"][i] // a big fat slice of bytes
		// hash will look something like: CaL8cG90BWoNiB_PPLxFv6lGC
		imageHash := utils.RandSeq(25)                           // grab a good unique file name
		ext, ok := utils.ImgExt(file.Header.Get("Content-Type")) // check if file is an image and get the extention if it is
		// allowed_file_types = [image/jpeg, image/png, image/jpg, image/gif]
		fullURL := fmt.Sprintf("%s/public/images/uploads/%s.%s", utils.ServerAddr, imageHash, ext) // full url which can be used to access image on client
		storage := fmt.Sprintf("./public/images/uploads/%s.%s", imageHash, ext)                    // where should the images be stored?

		if ok { // if the file type is an image
			if err := c.SaveFile(file, storage); err != nil { // save image to disk
				return c.JSON(controllers.HTTPResponse{
					Message: "accepted files are JPEG, JPG, PNG",
					Success: false,
					Data:    nil,
				})
			}

			img := image.IMG{
				PostID: PostID,
				URL:    fullURL,
			}

			if err := img.Save(false); err != nil {
				return c.JSON(controllers.HTTPResponse{
					Message: "image could not be saved, please try again",
					Success: false,
					Data:    nil,
				})
			}

			images = append(images, img) // apppend image to slice
		}
	}

	return c.JSON(controllers.HTTPResponse{
		Message: fmt.Sprintf("saved %d files", len(images)),
		Success: true,
		Data:    images,
	})
}

func DeleteOneImageController(c *fiber.Ctx) error {
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
			Message: "invalid parameter received",
			Success: false,
			Data:    nil,
		})
	}

	img := image.IMG{ID: id}

	if err := img.Delete(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "image could not be deleted, please try again",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: fmt.Sprintf("deleted image: %d", id),
		Success: true,
		Data:    nil,
	})
}

func GetImageIDsController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(0, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	ids, err := image.GetIDs()

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to get images",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: fmt.Sprintf("found %d images", len(ids)),
		Success: true,
		Data:    ids,
	})
}

func ImageGETController(c *fiber.Ctx) error {
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

	img := image.IMG{ID: id}

	if err := img.Find(); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "unable to find image, image may have been deleted or moved",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: fmt.Sprintf("image with id %d found", img.ID),
		Success: true,
		Data:    img,
	})
}

func ImagesGETController(c *fiber.Ctx) error {
	if err := utils.PermissionApproval(0, c.Get("attained")); err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "you lack the nessecary privileges to perform that action",
			Success: false,
			Data:    nil,
		})
	}

	images, err := image.GetAll()

	if err != nil {
		return c.JSON(controllers.HTTPResponse{
			Message: "zero images found",
			Success: false,
			Data:    nil,
		})
	}

	return c.JSON(controllers.HTTPResponse{
		Message: fmt.Sprintf("found %d images", len(images)),
		Success: true,
		Data:    images,
	})
}
