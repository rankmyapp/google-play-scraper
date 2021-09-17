# google-play-api

Turns [google-play-scraper](https://github.com/facundoolano/google-play-scraper/) into a RESTful API.

To run locally:

```
npm install
npm start
```

To run using [now](https://zeit.co/now/):

```sh
npm install -g now
now
```

Results:

```javascript
{
  title: 'Google Translate',
  description: 'Translate between 103 languages by typing\r\n...' ,
  descriptionHTML: 'Translate between 103 languages by typing<br>...',
  summary: 'The world is closer than ever with over 100 languages',
  installs: '500,000,000+',
  minInstalls: 500000000,
  maxInstalls: 898626813,
  score: 4.482483,
  scoreText: '4.5',
  ratings: 6811669,
  reviews: 1614618,
  histogram: { '1': 370042, '2': 145558, '3': 375720, '4': 856865, '5': 5063481 },
  price: 0,
  free: true,
  currency: 'USD',
  priceText: 'Free',
  offersIAP: false,
  IAPRange: undefined,
  size: 'Varies with device',
  androidVersion: 'VARY',
  androidVersionText: 'Varies with device',
  developer: 'Google LLC',
  developerId: '5700313618786177705',
  developerEmail: 'translate-android-support@google.com',
  developerWebsite: 'http://support.google.com/translate',
  developerAddress: '1600 Amphitheatre Parkway, Mountain View 94043',
  privacyPolicy: 'http://www.google.com/policies/privacy/',
  developerInternalID: '5700313618786177705',
  genre: 'Tools',
  genreId: 'TOOLS',
  familyGenre: undefined,
  familyGenreId: undefined,
  icon: 'https://lh3.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA',
  headerImage: 'https://lh3.googleusercontent.com/e4Sfy0cOmqpike76V6N6n-tDVbtbmt6MxbnbkKBZ_7hPHZRfsCeZhMBZK8eFDoDa1Vf-',
  screenshots: [
    'https://lh3.googleusercontent.com/dar060xShkqnJjWC2j_EazWBpLo28X4IUWCYXZgS2iXes7W99LkpnrvIak6vz88xFQ',
    'https://lh3.googleusercontent.com/VnzidUTSWK_yhpNK0uqTSfpVgow5CsZOnBdN3hIpTxODdlZg1VH1K4fEiCrdUQEZCV0',
  ],
  video: undefined,
  videoImage: undefined,
  contentRating: 'Everyone',
  contentRatingDescription: undefined,
  adSupported: false,
  released: undefined,
  updated: 1576868577000,
  version: 'Varies with device',
  recentChanges: 'Improved offline translations with upgraded language downloads',
  comments: [],
  editorsChoice: true,
  features: [
    {
      title: 'Uses Google Play Games',
      description: 'For automatic sign-in, leaderboards, achievements, and more.'
    },
    {
      title: 'Achievements',
      description: 'Grants you achievements for completing goals and skill-based challenges.'
    }
  ],
  appId: 'com.google.android.apps.translate',
  url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.translate&hl=en&gl=us'
}
```

## Play With Docker

[![Try in PWD](https://raw.githubusercontent.com/play-with-docker/stacks/master/assets/images/button.png)](https://labs.play-with-docker.com/?stack=https://gist.githubusercontent.com/srikanthlogic/49d3dd76cf1117f775fdc5c9746cd091/raw/8593bfa6b15036616147e8f672ecb558fcf87fc6/docker-compose.yml)

## Example requests

The parameters for each endpoint are taken directly from google-play-scraper. For a full reference check its [documentation](https://github.com/facundoolano/google-play-scraper/#usage).

Get the top free apps (default list)
```http
GET /api/apps/
```

Get the top free apps with full detail

```http
GET /api/apps/?fullDetail=true
```

Get the top selling action games in russia

```http
GET /api/apps/?collection=topselling_paid&category=GAME_ACTION&country=ru
```

Get an app detail

```http
GET /api/apps/com.dxco.pandavszombies/
```

Get an app detail in spanish

```http
GET /api/apps/com.dxco.pandavszombies/?lang=es
```

Get app required permissions with full descriptions

```http
GET /api/apps/com.dxco.pandavszombies/permissions/
```

Get app required permissions (short list)

```http
GET /api/apps/com.dxco.pandavszombies/permissions/?short=true
```

Get similar apps

```http
GET /api/apps/com.dxco.pandavszombies/similar/
```

Get an app's reviews

```http
GET /api/apps/com.dxco.pandavszombies/reviews/
```

Search apps

```http
GET /api/apps/?q=facebook
```

Get search suggestions for a partial term

```http
GET /api/apps/?suggest=face
```

Get apps by developer

```http
GET /api/developers/DxCo%20Games/
```
