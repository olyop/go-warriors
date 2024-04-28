package utils

import (
	"fmt"
	"time"
)

const prefix = "[INT] "
const dateLayout = "2006/01/02 - 15:04:05"
const spaces = "                                                    "

// Log logs a message with the current date and time
func Log(message string) {
	now := time.Now()
	date := now.Format(dateLayout)

	value := fmt.Sprintf("%s%s%s%s", prefix, date, spaces, message)

	fmt.Println(value)
}
