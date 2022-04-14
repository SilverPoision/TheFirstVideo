import Cookies from "js-cookie";

export function removeCookieAndLocalstorage(cookies) {
  if (typeof window !== "undefined") {
    cookies.map((el) => {
      Cookies.remove(el);
    });
  }
}

export function getCookies(cookie) {
  let session, token;
  try {
    let cookies = cookie.split(" ");
    session = cookies[0].split("=")[1];
    session = session.split(";")[0];
    token = cookies[1].split("=")[1];
    return [session, token];
  } catch (err) {
    session = undefined;
    token = undefined;
    return [session, token];
  }
}

export async function fetchSubs() {
  const access = Cookies.get("access_token");
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/subscriptions?mine=true&access_token=${access}&maxResults=50&part=snippet`
  );
  const data = await res.json();
  return data;
}

export async function verifyAuthPage(session, token) {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/authenticate`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: session,
        "Access-Token": token,
      },
    }
  );
  const data = await res.json();
  if (data.success) {
    return { success: true, user: data.user };
  } else {
    return { success: false };
  }
}

export async function fetchChannels() {
  const session = Cookies.get("session");
  const token = Cookies.get("access_token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/priority`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: session,
        "Access-Token": token,
      },
    }
  );

  const data = await res.json();
  return data;
}

export async function changePriorities(priority, name, action) {
  const session = Cookies.get("session");
  const token = Cookies.get("access_token");
  if (action == "up") {
    if (priority <= 1) {
      priority;
    } else {
      priority--;
    }
  } else if (action == "down") {
    priority++;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/priority`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session,
        "Access-Token": token,
      },
      body: JSON.stringify({
        name,
        priority,
      }),
    }
  );
  const data = await res.json();

  return data;
}

export async function deleteChannel(id) {
  const session = Cookies.get("session");
  const token = Cookies.get("access_token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/priority`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: session,
        "Access-Token": token,
      },
      body: JSON.stringify({
        id,
      }),
    }
  );
  const data = await res.json();

  return data;
}

export async function fetchVideos(id_array) {
  const access = Cookies.get("access_token");
  let data = {};
  let uploadId = {};
  await Promise.all(
    id_array.map(async (el, i) => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?access_token=${access}&id=${el.channel_id}&part=contentDetails`
      );
      const singleData = await res.json();
      uploadId[i] = singleData.items[0].contentDetails.relatedPlaylists.uploads;
    })
  );

  await Promise.all(
    Object.values(uploadId).map(async (el, i) => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?access_token=${access}&playlistId=${el}&part=snippet,contentDetails&maxResults=1`
      );
      const singleData = await res.json();
      data[i] = singleData.items[0].snippet;
    })
  );

  return data;
}
