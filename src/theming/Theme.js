function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrastRatio(rgb1, rgb2) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export const primaryTheme = {
  fixedWidth: "1200px",
  brandColor: "#ffa765",
  font: {
    serif: "Lora",
    sans: "Nunito",
  },
  default: {
    color: "#ffffff",
    textColor: "#001515",
  },
  inverted: {
    color: "#001515",
    textColor: "#ffffff",
  },
  background: {
    color: "#ecfbff",
    textColor: "#2c3643",
  },
  primary: {
    color: "#013334",
    textColor: "#ffffff",
  },
  secondary: {
    color: "#e0f2eb",
    textColor: "#001515",
  },
  tertiary: {
    color: "#ffffff",
    textColor: "#ffa765",
  },
  primaryInverted: {
    textColor: "#013334",
    color: "#ffffff",
  },
  secondaryInverted: {
    textColor: "#e0f2eb",
    color: "#001515",
  },
  tertiaryInverted: {
    textColor: "#ffffff",
    color: "#ffa765",
  },
  link: {
    color: "#ffffff",
    activeColor: "#ffa765",
  },
};
