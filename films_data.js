// Compiled via scripts/compile_films.js
const filmsByISO = {
  "3": [
    "FPP Mz3 Fine Grain",
    "FPP Eastman Kodak 5302 Fine Grain",
    "FPP Blue Ultra Color",
    "Svema / Astrum МЗ-3 (MZ-3)"
  ],
  "5": [
    "FPP X-Ray Film"
  ],
  "6": [
    "FPP Fine Grain Six",
    "FPP Low ISO Black & White",
    "FPP Blue Sensitive",
    "KONO! Donau 6",
    "SPUR Ultra R 800"
  ],
  "8": [
    "Lomography Fantome Kino"
  ],
  "10": [
    "FPP X-Ray Film",
    "Ultrafine Ortho Litho Film"
  ],
  "12": [
    "Film Washi 'A'"
  ],
  "13": [
    "Lomography Babylon Kino"
  ],
  "20": [
    "ADOX CMS 20 II PRO"
  ],
  "25": [
    "FPP Sonic 25 BW Film",
    "FPP Eastman Kodak Hi-Con 2369 25",
    "Film Washi 'W' 25",
    "Rollei RPX 25",
    "Rollei Ortho Plus 25",
    "Rollei Blackbird 25",
    "Silberra S25"
  ],
  "32": [
    "Argenti Nanotomic X 32",
    "SPUR DSX 32"
  ],
  "40": [
    "ILFORD ORTHO PLUS 40"
  ],
  "50": [
    "ADOX HR-50",
    "ADOX SCALA 50",
    "AGFA Copex Rapid 50",
    "Cinestill 50D",
    "FPP Eastman Kodak Hi-Fi 2374 50",
    "Film Washi 'S' 50",
    "FUJIFILM Fujichrome Velvia 50",
    "ILFORD Pan F Plus 50",
    "Lomography Redscale XR 50-200",
    "SFL 50D",
    "Silberra Orta 50",
    "Silberra Pan 50/Ultima 50",
    "Silberra Color 50"
  ],
  "64": [
    "FPP Dracula 64",
    "KONO! MONOLIT 64",
    "SPUR DSX 64",
    "Svema / Astrum ФН-64 (FN-64)"
  ],
  "80": [
    "ADOX IR-HR PRO 50 80",
    "CatLABS X FILM 80",
    "Ferrania P30 80",
    "ILFORD ORTHO PLUS 80",
    "Rollei Retro 80S"
  ],
  "100": [
    "ADOX CHS 100 II",
    "AGFA PHOTO APX 100",
    "Argenti Scale-X 100",
    "Argenti PAN-X 100",
    "FPP Emulsion X 100",
    "FPP WolfMan 100",
    "FPP Let It Snow 100",
    "FPP Derev Pan 100",
    "FPP BW 100",
    "FPP Tasma NK-2 100",
    "FPP Basic color film 100",
    "Film Washi 'V' 100",
    "Film Washi 'P' 100",
    "Film Washi 'F' 100",
    "Foma FOMAPAN 100 'Classic'",
    "Foma FOMAPAN R 100",
    "FOTOIMPEX CHM 100",
    "FUJIFILM Neopan ACROS 100 II",
    "FUJIFILM FujiColor 100",
    "FUJIFILM Fujichrome Velvia 100",
    "FUJIFILM Fujichrome Provia 100F",
    "ILFORD Pan 100",
    "ILFORD DELTA 100",
    "Kentmere PAN 100",
    "Kodak T-MAX 100",
    "Kodak Pro Image 100",
    "Kodak Ektar 100",
    "Kodak Ektachrome E100",
    "KONO! REKORDER 100-200",
    "Kosmo Foto Mono 100",
    "Lomography Earl Grey 100",
    "Lomography Potsdam 100",
    "Lomography Color Negative 100",
    "Lomography LomoChrome Metropolis 100",
    "Lomography LomoChrome Purple XR 100",
    "Oriental SEAGULL 100",
    "ORWO tbc. 100",
    "Rera Pan 100S",
    "Rera Cool 100",
    "Rera Chrome 100",
    "Rollei RPX 100",
    "Rollei Blackbird 100",
    "SFL UN54 100",
    "Shanghai GP3 100 PAN",
    "Shanghai GP3 100 PAN",
    "Silberra Ultima 100",
    "Silberra Cinema UN54 100",
    "Silberra Color 100",
    "Svema / Astrum Фoto-100 (Foto-100)",
    "Tasma / Astrum НК-2Ш (NK-2) 100",
    "Ultrafine Finesse 100",
    "Ultrafine Xtreme 100"
  ],
  "125": [
    "ILFORD FP4 Plus 125",
    "KONO! Kolorit 125 Tungsten",
    "SFL T-25 125",
    "SFL T-42 125",
    "SFL A-Color 125",
    "Svema / Astrum Color 125"
  ],
  "160": [
    "Kodak Portra 160",
    "Polaroid SX-70 film 160",
    "Silberra Pan 160/Ultima 160",
    "Silberra Color 160"
  ],
  "200": [
    "ADOX Color Mission 200",
    "Cinestill Red Rum 200",
    "dubblefilm Apollo 200",
    "dubblefilm Bubblegum 200",
    "dubblefilm Jelly 200",
    "dubblefilm Pacific 200",
    "dubblefilm Solar 200",
    "dubblefilm Stereo 200",
    "FPP S 200 iso",
    "FPP Film Love (Hearts) /Film Love (Shamrocks) 200",
    "FPP Frankenstein 200",
    "FPP Derev Pan 200",
    "FPP X2 200",
    "Foma FOMAPAN 200 'Creative'",
    "FUJIFILM 200",
    "FUJIFILM FujiColor C200",
    "ILFORD SFX 200",
    "Kodak ColorPlus 200",
    "Kodak Gold 200",
    "KONO! REKORDER 100-200",
    "KONO! ALiEN 200",
    "KONO! UFO 200",
    "KONO! KATZ 200",
    "KONO! LUFT 200",
    "KONO! LIEBE 200",
    "KONO! WINTERMÄRCHEN 200",
    "Lomography Orca 200",
    "Lomography Color Tiger 200",
    "Lomography Redscale XR 50-200",
    "Lomography Lobster Redscale 200",
    "Lomography Peacock X-Pro 200",
    "Revolog Snovlox 200",
    "Revolog Rasp 200",
    "Revolog Volvox 200",
    "Revelog Texture 200",
    "Revolog Plexus 200",
    "Revolog Laser 200",
    "Revolog Streak 200",
    "Revolog Tesla I 200",
    "Revolog Tesla II 200",
    "Revolog Kosmos 200",
    "Revolog Nebula 200",
    "Revolog Kolor 200",
    "Revolog 460 nm 200",
    "Revolog 600 nm 200",
    "Rollei SuperPan 200",
    "Rollei CrossBird 200",
    "SFL 200T",
    "Silberra Pan 200/Ultima 200",
    "Silberra U200",
    "Silberra Cinema 52XX 200",
    "Svema / Astrum Фoto-200 (Foto-200)"
  ],
  "250": [
    "Cinestill bwXX 250",
    "SFL Double-X 5222 250",
    "SFL 250D"
  ],
  "320": [
    "CatLABS X FILM 320",
    "Foma RETRO PAN 320 'Soft'",
    "Kodak Tri-X 320",
    "SFL UN75 320"
  ],
  "400": [
    "AGFA PHOTO APX 400",
    "Argenti ARF+ Reporter Film Plus 400",
    "Bergger Pancro 400",
    "dubblefilm Daily black&white 400",
    "dubblefilm Daily Color 400",
    "FPP Derev Pan 400",
    "FPP New Classic EZ400",
    "FPP Retrochrome 400",
    "Film Washi 'Z' 400",
    "Foma FOMAPAN 400 'Action'",
    "FOTOIMPEX CHM 400",
    "FUJIFILM FujiColor Superia Premium 400",
    "FUJIFILM FujiColor Superia X-tra 400",
    "FUJIFILM Fujicolor Pro 400H",
    "HOLGA 400",
    "ILFORD Pan 400",
    "ILFORD HP5 Plus 400",
    "ILFORD DELTA 400",
    "ILFORD XP2 Super 400",
    "JCH Streetpan 400",
    "Kentmere PAN 400",
    "Kodak Tri-X 400",
    "Kodak T-MAX 400",
    "Kodak Ultra Max 400",
    "Kodak Portra 400",
    "KONO! Kolorit 400 Tungsten",
    "KONO! Rotwild 400",
    "Kosmo Foto Agent Shadow 400",
    "Lomography Lady Grey 400",
    "Lomography Berlin 400",
    "Lomography Color Negative 400",
    "Lomography LomoChrome Metropolis 400",
    "Lomography LomoChrome Purple XR 400",
    "Oriental SEAGULL 400",
    "Rera Pan 400",
    "Rollei RPX 400",
    "Rollei Retro 400S",
    "Rollei Infrared 400",
    "Rollei Redbird 400",
    "SFL Double-X Aerographic 400",
    "Shanghai GP3 400 PAN",
    "Silberra U400",
    "Silberra Cinema 75N+ 400",
    "Street Candy ATM 400",
    "Svema / Astrum Фoto-400 (Foto-400)",
    "Svema / Astrum А-2Ш (A-2SH) 400",
    "Ultrafine Finesse 400",
    "Ultrafine Xtreme 400",
    "Yodica Antares 400",
    "Yodica Andromeda 400",
    "Yodica Atlas 400",
    "Yodica Pegasus 400",
    "Yodica Polaris 400",
    "Yodica Sirio 400",
    "Yodica Vega 400"
  ],
  "500": [
    "Film Washi 'D' 500",
    "SFL 500T"
  ],
  "640": [
    "Polaroid i-type film 640",
    "Polaroid 600 film 640",
    "Polaroid 8 x 10 film 640",
    "Rollei Paul & Reinhold 640"
  ],
  "800": [
    "Cinestill 800T",
    "FUJIFILM Instax mini 800",
    "FUJIFILM Instax wide 800",
    "FUJIFILM Instax Square 800",
    "Kodak T-MAX P3200 800",
    "Kodak Ultra Max 800",
    "Kodak Portra 800",
    "Lomography Color Negative 800"
  ],
  "1000": [
    "ILFORD DELTA 1000"
  ],
  "3200": [
    "ILFORD DELTA 3200"
  ],
  "0.8": [
    "FPP Super Positive Film"
  ],
  "1.6": [
    "FPP Low ISO Color"
  ]
}
