package utils

import "time"

const dateLayout = "2006-01-02"

// FormatTimeToDate formats a time to a date string
func FormatTimeToDate(t time.Time) string {
	return t.Format(dateLayout)
}

// TimeToStartOfDay sets the time to the start of the day
func TimeToStartOfDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}

// DaysBetweenDates returns the number of days between two dates
func DaysBetweenDates(startDate, endDate time.Time) int {
	days := 0

	for startDate.Before(endDate) {
		startDate = startDate.AddDate(0, 0, 1)
		days++
	}

	return days
}
