// @ts-check
(function () {
  if (document.readyState != 'loading') {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run);
  }
}());

/**
 * @param {string} sunniness
 * @param {number} uv
 */
function filmFromSunninessAndUV(sunniness, uv) {
  if (sunniness === 'Sunny') {
    return randomItemFromNumberRangeInObjectOfListsKeyedByNumber(filmsByISO, 0, 200);
  } else if (sunniness === 'Sunny Intervals') {
    if (uv > 1) {
      return randomItemFromNumberRangeInObjectOfListsKeyedByNumber(filmsByISO, 160, 200);
    } else {
      return randomItemFromNumberRangeInObjectOfListsKeyedByNumber(filmsByISO, 200, 400);
    }
  } else {
    return randomItemFromNumberRangeInObjectOfListsKeyedByNumber(filmsByISO, 500, 10000);
  }
}

const JSON_STORAGE_KEY = 'weatherportrait_res';
const POSTCODE_STORAGE_KEY = 'weatherportrait_url';

const messages = [
  'looks to be a nice dose of',
  'how about a spot of',
  'perhaps a smidge of',
  'maybe a roll of',
  'feels like a day of',
];

function lovelyMessage() {
  return randFromArray(messages);
}

/**
 * @param {object} obj
 * @param {number} min
 * @param {number} max
 */
function randomItemFromNumberRangeInObjectOfListsKeyedByNumber(obj, min, max) {
  const keyNumbersInRange = Object.keys(obj)
                                  .map(key => parseFloat(key))
                                  .filter(n => n >= min && n <= max);

  const randomKeyNumber = randFromArray(keyNumbersInRange);
  const list = obj[randomKeyNumber.toString()];
  return list[Math.floor(Math.random() * list.length)];
}

/** @param {any[]} arr */
function randFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function run() {
  const postcodeForm  = /** @type {HTMLFormElement} */  (document.getElementById('get_postcode'));
  const postcodeInput = /** @type {HTMLInputElement} */ (document.getElementById('postcode_input'));
  const errorsElement = /** @type {HTMLElement} */      (document.getElementById('get_postcode_errors'));
  const resultElement = /** @type {HTMLElement} */      (document.getElementById('result'));
  const loadingElement = /** @type {HTMLElement} */      (document.getElementById('form_loading'));
  // const debugElement  = /** @type {HTMLPreElement} */   (document.getElementById('result_debug'));

  const errorPrefix = errorsElement.innerHTML;

  const resultTitleEl     = /** @type {HTMLElement} */      (document.getElementById('result_title'));
  // const resultDateEl      = /** @type {HTMLElement} */      (document.getElementById('result_date'));
  const resultCopyrightEl = /** @type {HTMLElement} */      (document.getElementById('result_copyright'));
  const resultItemsEl     = /** @type {HTMLDListElement} */ (document.getElementById('result_items'));
  const resultSourceEl    = /** @type {HTMLElement} */      (document.getElementById('result_source'));

  const kindError = "sometimes the beeb's RSS feed is a bit 🤷, not sure why, keep trying again and hopefully it'll work 😊";

  postcodeForm.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    const postcode = postcodeInput.value.trim();
    if (postcode) {
      history.pushState(null, '', `?postcode=${postcode}`);
      fetchAndDisplay(postcode);
    } else {
      setError('Please enter the first part of a postcode, or a BBC Weather location ID');
    }
  });

  const storedRes = localStorage.getItem(JSON_STORAGE_KEY);
  const storedPostcode = localStorage.getItem(POSTCODE_STORAGE_KEY);
  if (storedRes && storedPostcode) {
    postcodeInput.value = storedPostcode;
    renderFeed(JSON.parse(storedRes), storedPostcode);
  }

  const urlPostcode = new URLSearchParams(location.search).get('postcode');
  if (urlPostcode && urlPostcode !== storedPostcode) {
    postcodeInput.value = urlPostcode;
    fetchAndDisplay(urlPostcode);
  }

  /** @param {boolean} isLoading */
  function setLoading(isLoading) {
    loadingElement.hidden = !isLoading;
    resultElement.classList.toggle('is-loading', isLoading);
  }

  function setError(err) {
    errorsElement.hidden = false;
    errorsElement.innerHTML = `${errorPrefix} ${err}`;
  }

  function clearError() {
    errorsElement.hidden = true;
    errorsElement.textContent = '';
  }

  function feedUrl(postcode) {
    return `https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/${postcode}`;
  }

  /** @param {string} postcode */
  function fetchAndDisplay(postcode) {
    postcode = postcode.toLowerCase();

    clearError();
    setLoading(true);

    xhrGet(feedUrl(postcode))
      .then(res => {
        setLoading(false);

        if (!res) {
          setError(`No response - ${kindError}`);
          return;
        }

        if (res.status != 200) {
          setError(`Unexpected response - ${kindError}`);
          console.error(`Non-200 response:\n${res.response}`);
          return;
        }

        if (!res.responseXML) {
          setError(`Unexpected response - ${kindError}`);
          console.error(`No response XML:\n${res.response}`);
          return;
        }

        const xmlJson = parseXmlToObject(res.responseXML, ['item']);
        localStorage.setItem(JSON_STORAGE_KEY, JSON.stringify(xmlJson));
        localStorage.setItem(POSTCODE_STORAGE_KEY, postcode);
        renderFeed(xmlJson, postcode);
      })
      .catch(err => {
        setError(`Something went wrong - ${kindError}`);
        console.error(err);
      });
  }

  /**
   * @param {object} xmlJson
   * @param {string} postcode
   */
  function renderFeed(xmlJson, postcode) {
    const weatherValues = xmlJson && xmlJson.rss && xmlJson.rss.channel;
    if (!weatherValues) {
      setError(`Unexpected response - ${kindError}`);
      console.error(`Unable to parse weather values from RSS feed:\n${JSON.stringify(xmlJson, null, 2)}`);
      return;
    }

    // debugElement.innerHTML = '';
    resultTitleEl.innerHTML = '';
    // resultDateEl.innerHTML = '';
    resultCopyrightEl.innerHTML = '';
    resultItemsEl.innerHTML = '';
    resultSourceEl.innerHTML = '';

    resultElement.lang = weatherValues.language && weatherValues.language['#text']; // if null, attr will be removed, which is good, so it defaults to inheritance

    resultTitleEl.textContent = weatherValues.title && weatherValues.title['#text'];
    // resultDateEl.textContent = weatherValues.pubDate && `Report made at ${weatherValues.pubDate['#text']}`;
    resultCopyrightEl.textContent = weatherValues.copyright && weatherValues.copyright['#text'];

    if (weatherValues.link) {
      resultSourceEl.textContent = 'Source for weather data: ';
      const sourcePageLink = document.createElement('a');
      const sourceFeedLink = document.createElement('a');

      sourceFeedLink.href        = feedUrl(postcode);
      sourceFeedLink.textContent = 'feed';
      sourceFeedLink.ariaLabel   = 'Source RSS feed for the weather data';
      resultSourceEl.appendChild(sourceFeedLink);

      resultSourceEl.append(' | ');

      // When inputting a lowercase postcode, the RSS feed returns a page
      // link with the postcode in uppercase, which fails to find a forecast
      // when you visit it. So until that gets fixed (or maybe we're using
      // the RSS feed wrong?) then we build our own source link.
      // sourcePageLink.href        = weatherValues.link['#text'];
      sourcePageLink.href        = `https://www.bbc.co.uk/weather/${postcode}`;
      sourcePageLink.textContent = 'page';
      sourceFeedLink.ariaLabel   = 'Source page for the weather data';
      resultSourceEl.appendChild(sourcePageLink);
    }

    if (weatherValues.item) {
      weatherValues.item.forEach(item => {
        let /** @type {string} */ title = item.title && item.title['#text'].split(',')[0]; // pulls out the name of the day and overview; ignores temperatures
        if (!title) {
          return;
        }

        let titleParts = title.split(':');
        let day        = titleParts[0];
        let sunniness  = titleParts[1] && titleParts[1].trim();

        let /** @type {string} */ uvString = item.description && item.description['#text'];
        let uvMatch = uvString.match(/UV[^,.]*(\d+)/);
        let uvNumber = uvMatch && uvMatch[1];

        if (title && uvNumber != null) {
          const listTitle = document.createElement('dt');
          const listItem = document.createElement('dd');
          listTitle.textContent = day;
          listItem.innerHTML = `${lovelyMessage()} <em>${filmFromSunninessAndUV(sunniness, parseInt(uvNumber[1], 10))}</em>${Math.random() > 0.5 ? '?' : ''}`;
          resultItemsEl.appendChild(listTitle);
          resultItemsEl.appendChild(listItem);
        }
      });
    } else {
      const listItem = document.createElement('dd');
      listItem.textContent = 'No forecast days found';
      resultItemsEl.appendChild(listItem);
    }

    if (!resultItemsEl.textContent || resultItemsEl.textContent.length === 0) {
      setError(`Something went wrong - ${kindError}`);
      console.error(`Unable to parse weather items from RSS feed JSON:\n${JSON.stringify(xmlJson, null, 2)}`);
    } else {
      clearError();
      resultElement.hidden = false;
    }
  }
}

/**
 * @param {string} url
 * @returns {Promise<XMLHttpRequest,Error>}
*/
async function xhrGet(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', function () {
      resolve(this);
    });
    req.addEventListener('error', reject);
    req.addEventListener('abort', reject);
    req.addEventListener('timeout', reject);
    req.open('GET', url);
    req.send();
  });
}

/**
 * @param {Document} xml
 * @param {string[]=} arrayTags
 * Copied from https://stackoverflow.com/a/19448718/3150057 (thanks Maylow Hayes)
 */
function parseXmlToObject(xml, arrayTags) {
  /**
   * @param {Element} xmlNode
   * @param {object} result
  */
  function parseNode(xmlNode, result) {
    if (xmlNode.nodeName == "#text") {
      if (xmlNode.nodeValue && xmlNode.nodeValue.trim()) {
        result['#text'] = xmlNode.nodeValue;
      }
      return;
    }

    let jsonNode = {};
    let existing = result[xmlNode.nodeName];
    if (existing) {
      if (!Array.isArray(existing)) {
        result[xmlNode.nodeName] = [existing, jsonNode];
      } else {
        result[xmlNode.nodeName].push(jsonNode);
      }
    } else {
      if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1) {
        result[xmlNode.nodeName] = [jsonNode];
      } else {
        result[xmlNode.nodeName] = jsonNode;
      }
    }

    if (xmlNode.attributes) {
      Array.from(xmlNode.attributes).forEach(attr => jsonNode[attr.nodeName] = attr.nodeValue);
    }

    Array.from(xmlNode.childNodes).forEach(node => parseNode(/** @type {Element} */ (node), jsonNode));
  }

  let result = {};
  Array.from(xml.childNodes).forEach(node => parseNode(/** @type {Element} */ (node), result));

  return result;
}
