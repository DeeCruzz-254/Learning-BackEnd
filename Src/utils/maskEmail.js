/**
 * Mask an email address keeping first two characters of username visible
 * and replacing the remaining username characters with asterisks.
 * Examples:
 *  - johndoe@gmail.com => jo*****@gmail.com
 *  - alex@yahoo.com => al**@yahoo.com
 *  - ab@site.com => ab@site.com  (username length <= 2, not masked)
 *
 * This function does not modify or persist the original email.
 * It only returns a masked string for safe responses.
 */
export function maskEmail(email) {
    if (!email || typeof email !== 'string') return email;

    const atIndex = email.indexOf('@');
    if (atIndex <= 0) return email; // invalid or no username

    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex + 1);

    // If username length is 2 or fewer, return original (no masking)
    if (username.length <= 2) return `${username}@${domain}`;

    const visible = username.slice(0, 2);
    const maskedCount = username.length - 2;
    const masked = '*'.repeat(maskedCount);

    return `${visible}${masked}@${domain}`;
}

export default maskEmail;
