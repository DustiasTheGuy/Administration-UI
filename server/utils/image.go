package utils

import "math/rand"

const ServerAddr = "http://localhost:8084"

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_")

func ImgExt(filetype string) (string, bool) {
	switch filetype {
	case "image/jpeg":
		return "jpeg", true
	case "image/jpg":
		return "jpg", true
	case "image/png":
		return "png", true
	case "image/gif":
		return "gif", true
	default:
		return "", false
	}
}

func RandSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
