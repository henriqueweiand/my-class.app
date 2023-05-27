import { google } from "googleapis";
import { OAuth2Client } from 'google-auth-library';

interface updateAgendaProps {
    eventData: any;
    eventId: string;
    googleUserAuth: OAuth2Client;
}

export const updateAgenda = async ({ eventId, eventData, googleUserAuth }: updateAgendaProps) => {
    const calendar = google.calendar({
        version: 'v3',
        auth: googleUserAuth,
    })

    const event = await calendar.events.patch({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        eventId: eventId,
        sendUpdates: 'none',
        requestBody: eventData,
    })

    if (!event) {
        return {
            event: null,
        }
    }

    return {
        event,
    };
}