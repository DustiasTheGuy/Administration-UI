package image

import "time"

func GetPlaceholder() IMG {
	return IMG{
		ID:        0,
		URL:       "http://localhost:8084/public/images/placeholder.png",
		Date:      time.Now().UTC(),
		PostID:    0,
		Thumbnail: 1,
	}
}
