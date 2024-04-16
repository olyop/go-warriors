package utils

import (
	"fmt"
	"gowarriors/utils"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
)

// ParseID parses the ID from the request
func ParseID(request *http.Request) (int, error) {
	id := chi.URLParam(request, "id")

	if id == "" {
		return 0, fmt.Errorf("Invalid ID: %s. Please provide a valid ID", id)
	}

	i, ok := utils.ParseStringToInt(id)

	if !ok {
		return 0, fmt.Errorf("Invalid ID: %s. Please provide a valid ID", id)
	}

	return i, nil
}

// ParseUnixTime parses a unix time string to a time.Time in UTC
func ParseUnixTime(value string) (time.Time, error) {
	if value == "" {
		return time.Time{}, fmt.Errorf("Invalid unix time: '%s'. Cannot be empty", value)
	}

	unixTime, err := strconv.Atoi(strings.TrimSpace(value))

	if err != nil {
		return time.Time{}, fmt.Errorf("Invalid unix time: '%s'. Please provide a valid unix time", value)
	}

	if unixTime < 0 {
		return time.Time{}, fmt.Errorf("Invalid unix time: '%s'. Cannot be negative", value)
	}

	return time.Unix(int64(unixTime), 0).UTC(), nil
}

// ParseTeamsFilter parses the teams filter from the request
func ParseTeamsFilter(teamsFilter string) ([]int, error) {
	if teamsFilter == "" {
		return nil, nil
	}

	if strings.Contains(teamsFilter, " ") {
		return nil, fmt.Errorf("Invalid teams filter: '%s'. Please provide a valid comma separated list of teams", teamsFilter)
	}

	teams := strings.Split(teamsFilter, ",")

	if len(teams) == 0 {
		return nil, fmt.Errorf("Invalid teams filter: '%s'. Please provide a valid comma separated list of teams", teamsFilter)
	}

	ids := make([]int, len(teams))

	for i, team := range teams {
		id, ok := utils.ParseStringToInt(team)

		if !ok {
			return nil, fmt.Errorf("Invalid team ID: '%s'. Please provide a valid team ID", team)
		}

		ids[i] = id
	}

	return ids, nil
}

func ParseConferenceFilter(conference string) (string, error) {
	if conference == "" {
		return "", nil
	}

	if conference != "east" && conference != "west" {
		return "", fmt.Errorf("Invalid conference filter: '%s'. Please provide a valid conference filter", conference)
	}

	return conference, nil
}

// ParseStatusFilter parses the status filter from the request
func ParseStatusFilter(status string) (string, error) {
	if status == "" {
		return "", nil
	}

	if status != "scheduled" && status != "in_progress" && status != "final" && status != "halftime" && status != "end_of_period" {
		return "", fmt.Errorf("Invalid status filter: '%s'. Please provide a valid status filter", status)
	}

	return status, nil
}
