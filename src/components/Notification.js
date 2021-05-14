import { Snackbar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import NotificationService from '../services/NotificationService'
 


const Notification = () => {

  const [notificationState, setNotificationState] = useState({ open: false });

  useEffect(() => {

    const subscription = NotificationService.events$.subscribe(notification => setNotificationState(notification));

    return () => subscription.unsubscribe();

  });

  return (
    <Snackbar
      open={ notificationState.open }
      onClose={()=>NotificationService.close()  }
      message={notificationState.message}
      autoHideDuration={ 3000 }
    />
  )
}

export default Notification
