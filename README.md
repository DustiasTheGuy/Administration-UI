## Admin User Interface

```go

package utils

func GetClaims() JwtWrapper {
	return JwtWrapper{
		SecretKey:       "secret_key",
		Issuer:          "someone",
		ExpirationHours: 24,
	}
}

```