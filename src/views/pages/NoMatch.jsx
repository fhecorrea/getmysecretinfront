import React from "react";
import { useLocation } from "react-router-dom";

export default function NoMatch() {
  
  document.title = "Página não encontrada! :: GetMySecret";
  const loc = useLocation();

  return (
    <div>
      <h2>Página “{loc.pathname}” não encontrada!</h2>
    </div>
  );
};