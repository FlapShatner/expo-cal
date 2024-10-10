fetch events yesterday, today, tomorrow.

### if end date is not start date:

- create an array of every date in sequence

### if event is all day:

- apply this event to each day

### if event has start and end times:

- apply those to first and last day,
- and all day for every day in between

I have a TS function that returns an array of objects shaped like this:
type Event = {
id: string;
calendarId: string;
title: string;
location: string;
creationDate?: string | Date;
lastModifiedDate?: string | Date;
timeZone: string;
endTimeZone?: string;
url?: string;
notes: string;
alarms: Alarm[];
recurrenceRule: RecurrenceRule;
startDate: string | Date;
endDate: string | Date;
originalStartDate?: string | Date;
isDetached?: boolean;
allDay: boolean;
availability: Availability;
status: EventStatus;
organizer?: string;
organizerEmail?: string;
accessLevel?: EventAccessLevel;
guestsCanModify?: boolean;
guestsCanInviteOthers?: boolean;
guestsCanSeeGuests?: boolean;
originalId?: string;
instanceId?: string;
};

I want to go through and push each event object into a new array, but I also need to find any of these events whose endDate is a later day than the startDate. The start and end date values could be different times on the same day, but I only want to find events which end on a different day than they started. When such an event is encountered, I want to push a copy of the event for every day in the sequence of days to the new events array. In the startDate and endDate fields for each copy, for both, the date should be the respective date from the sequence, and the "allDay" field should be true.

for example,
(these are truncated events for demonstration)
this array:
[
{
id:1,
startDate:10/8/24
endDate:10/8/24
}
{
id:2,
startDate:10/12/24
endDate:10/14/24
}
{
id:3,
startDate:10/18/24
endDate:10/18/24
}
]
would become
[
{
id:1,
startDate:10/8/24
endDate:10/8/24
}
{
id:2,
startDate:10/12/24
endDate:10/12/24
}
{
id:3,
startDate:10/13/24
endDate:10/13/24
}
{
id:4,
startDate:10/14/24
endDate:10/14/24
}
{
id:5,
startDate:10/18/24
endDate:10/18/24
}
]
