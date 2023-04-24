
  self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
      const applicationServerKey = urlB64ToUint8Array(
        'BCr32pvQucsO1jY9Po4o_xQ3I6v_VcPYFwswJnO_xgLvgH0M8kW25wviJInf5D-RJR6V4QnOomdoEsLXdX90BNE'
      )
      const options = { applicationServerKey, userVisibleOnly: true }
      const subscription = await self.registration.pushManager.subscribe(options)
      console.log(JSON.stringify(subscription))
    } catch (err) {
      console.log('Error', err)
    }
  })
self.addEventListener('push', (event) => {
    const data = event.data.json();
  
    self.registration.showNotification(data.title, {
      body: data.body,
    });
  });