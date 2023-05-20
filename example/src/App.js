
import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';

function App() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("event name");
  const [ eventData, setEventData] = useState();
  const [ eventDescription, setEventDescription ] = useState("event description");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
  if(isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("Creating calendar event");

    const event = {
      "conferenceData": {
          "conferenceId": "1234567890",
          "createRequest": {
              "conferenceSolutionKey": {
                  "type": "hangoutsMeet"
              },
              "requestId": "1234567890"
          }
      },
      "end": {
          "dateTime": "2023-05-19T00:46:00.000Z"
      },
      "start": {
          "dateTime": "2023-05-18T23:46:06.055Z"
      }
  };

    // const event = {
    //   'summary': eventName,
    //   'description': eventDescription,
    //   'start': {
    //     'dateTime': start.toISOString(), // Date.toISOString() ->
    //     'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
    //   },
    //   'end': {
    //     'dateTime': end.toISOString(), // Date.toISOString() ->
    //     'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
    //   },
    //   "conferenceData": {
    //     "conferenceId": "1234567890",
    //     "createRequest": {
    //       "requestId": "1234567890",
    //       "conferenceSolutionKey": {
    //         "type": "hangoutsMeet"
    //       }
    //     }
    //   },
    //   "conferenceDataVersion": 1
    // }
    // await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    await fetch("https://content.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&alt=json&key=", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      const dataResponse = data.json();
      return dataResponse;
    }).then((data) => {
      console.log(data);
      setEventData(data);
      alert("Event created, check your Google Calendar!");
    });
  }

  const inviteParticipants = async () => {
    const eventId = eventData.id;
    console.log('eventId', eventId)
    const token = session.provider_token;
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;
  
    const attendees = [
      { email: 'henrique.weiand@rockcontent.com' },
      // { email: 'participant2@example.com' },
      // Add more participants as needed
    ];
  
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendees }),
      });
  
      if (response.ok) {
        console.log('Participants invited successfully');

        const eventData = await response.json();
        console.log(eventData);
        // const eventId = eventData.id;
        // const hangoutLink = eventData.hangoutLink;

        alert('invited');
      } else {
        console.error('Handle participant invitation error')
        // Handle participant invitation error
      }
    } catch (error) {
      console.error(error);
      // Handle fetch error
    }
  };
  
  // Call the inviteParticipants function with the event ID to invite participants
  const invite = () => {
    inviteParticipants();
  }

  return (
    <div className="App">
      <div style={{width: "400px", margin: "30px auto"}}>
        {session ?
          <>
            <h2>Hey there {session.user.email}</h2>
            <p>Start of your event</p>
            <DateTimePicker onChange={setStart} value={start} />
            <p>End of your event</p>
            <DateTimePicker onChange={setEnd} value={end} />
            <p>Event name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>Event description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>
            <p></p>
            <button onClick={() => signOut()}>Sign Out</button>
            <button onClick={() => invite()}>invite</button>
          </>
          :
          <>
            <button onClick={() => googleSignIn()}>Sign In With Google</button>
          </>
        }
      </div>
    </div>
  );
}

export default App;
