import Cookies from "js-cookie";

export function removeCookie(cookies) {
  if (typeof window !== "undefined") {
    cookies.map((el) => {
      Cookies.remove(el);
    });
  }
}

export async function fetchSubs(access) {
  if (!access) {
    return false;
  }
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

export async function fetchChannels(session, access) {
  if (!session || !access) {
    session = Cookies.get("session");
    access = Cookies.get("access_token");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/priority`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: session,
        "Access-Token": access,
      },
    }
  );

  const data = await res.json();
  return data;
}

export async function changePriorities(priority, name, action) {
  const session = Cookies.get("session");
  const token = Cookies.get("access_token");
  if (!session || !token) {
    return false;
  }
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

  if (!session || !token) {
    return false;
  }

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

export async function fetchVideos(id_array, access) {
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
