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

I need to find any of these events whose endDate is a later day than the startDate. The start and end date values could be different times on the same day, but I only want to find events which end on a different day than they started. When such an event is encountered, I want to create an object containing the event's ID, as well as an array of all the dates from the startDate to the endDate. Could you please create a TS function do do that?
