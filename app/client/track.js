const __FB_TRACK_ID__ = 6029316041000;

export function trackSubscription(userEmail) {
  window._fbq.push(['track', __FB_TRACK_ID__, {'value': '0.00', 'currency': 'CLP'}]);
  window.ga('send', 'event', 'Account', 'Subscribed', userEmail);
}
