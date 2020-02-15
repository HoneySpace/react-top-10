import React, { Component } from 'react';

export const ThemeContext = React.createContext(
  {
    isDark: true,
    switchTheme: () => {this.isDark = !this.isDark}
  }
);