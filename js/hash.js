//https://stackoverflow.com/a/63499899
const digest = async ({ algorithm = "SHA-256", message }) =>
    Array.prototype.map
      .call(
        new Uint8Array(
          await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))
        ),
        (x) => ("0" + x.toString(16)).slice(-2)
      )
      .join("");