export const getInitials = (name: string): string => {
 const parts = name.trim().split(/\s+/);
 return parts[0][0].toUpperCase();
};



export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);
