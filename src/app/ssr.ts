// src/app/ssr.ts
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export function isBrowser() {
  const platformId = inject(PLATFORM_ID);
  return isPlatformBrowser(platformId);
}
export function isServer() {
  const platformId = inject(PLATFORM_ID);
  return isPlatformServer(platformId);
}
