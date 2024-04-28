package utils

import (
	"errors"
	"strconv"
	"strings"
	"time"
)

// ParseID parses the ID from the request
func ParseID(value string) (int, error) {
	id := strings.TrimSpace(value)

	if id == "" {
		return 0, errors.New("Invalid ID: ID cannot be empty")
	}

	i, err := strconv.Atoi(id)

	if err != nil {
		return 0, errors.New("Invalid ID: Please provide a valid ID")
	}

	return i, nil
}

// ParseDate parses a date string to a time.Time in UTC
func ParseDate(value string) (time.Time, error) {
	if value == "" {
		return time.Time{}, errors.New("Invalid date: Date cannot be empty")
	}

	date, err := time.Parse("2006-01-02", strings.TrimSpace(value))

	if err != nil {
		return time.Time{}, errors.New("Invalid date: Please provide a valid date in the format YYYY-MM-DD")
	}

	return date.UTC(), nil

}

// ParseUnixTime parses a unix time string to a time.Time in UTC
func ParseUnixTime(value string) (time.Time, error) {
	if value == "" {
		return time.Time{}, errors.New("Invalid unix time: Unix time cannot be empty")
	}

	unixTime, err := strconv.Atoi(strings.TrimSpace(value))

	if err != nil {
		return time.Time{}, errors.New("Invalid unix time: Please provide a valid unix time")
	}

	if unixTime < 0 {
		return time.Time{}, errors.New("Invalid unix time: Unix time cannot be negative")
	}

	return time.Unix(int64(unixTime), 0).UTC(), nil
}

// ParseTeamsFilter parses the teams filter from the request
func ParseTeamsFilter(teamsFilter string) ([]int, error) {
	if teamsFilter == "" {
		return nil, nil
	}

	if strings.Contains(teamsFilter, " ") {
		return nil, errors.New("Invalid teams filter: Teams filter cannot contain spaces")
	}

	teams := strings.Split(teamsFilter, ",")

	if len(teams) == 0 {
		return nil, errors.New("Invalid teams filter: Teams filter cannot be empty")
	}

	ids := make([]int, len(teams))

	for i, team := range teams {
		id, err := strconv.Atoi(team)

		if err != nil {
			return nil, errors.New("Invalid teams filter: Please provide a valid comma separated list of teams")
		}

		ids[i] = id
	}

	return ids, nil
}

// ParseConferenceFilter parses the conference filter from the request
func ParseConferenceFilter(conference string) (string, error) {
	if conference == "" {
		return "", nil
	}

	if conference != "east" && conference != "west" {
		return "", errors.New("Invalid conference filter: Please provide a valid conference filter")
	}

	return conference, nil
}

// ParseStatusFilter parses the status filter from the request
func ParseStatusFilter(status string) (string, error) {
	if status == "" {
		return "", nil
	}

	if status != "scheduled" && status != "in_progress" && status != "final" && status != "halftime" && status != "end_of_period" {
		return "", errors.New("Invalid status filter: Please provide a valid status filter")
	}

	return status, nil
}

// ParseFloat parses a float string to a float64
func ParseFloat(value string) float64 {
	f, err := strconv.ParseFloat(value, 64)

	if err != nil {
		return 0
	}

	return f
}
