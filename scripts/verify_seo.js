async function testPages() {
  const urls = [
    'http://localhost:3000/packages/local-tour',
    'http://localhost:3000/packages/city-tour',
    'http://localhost:3000/places/pillar-rocks',
    'http://localhost:3000/stays',
    'http://localhost:3000/custom-tour'
  ];

  for (const url of urls) {
    const res = await fetch(url);
    const html = await res.text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    console.log(`\nURL: ${url}`);
    console.log(`Title: ${title}`);
    console.log(`Description: ${desc}`);
  }
}

testPages();
