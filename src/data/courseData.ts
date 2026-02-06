// Course data extracted from PDFs - Single Source of Truth
// All content is in Spanish (Spain) as per the source material

export interface Module {
  id: string;
  number: number;
  title: string;
  objective: string;
  description: string;
  labTime: string;
  evalTime: string;
  tags: string[];
  sections: Section[];
  guidedPractice: PracticeStep[];
  commonErrors: CommonError[];
  miniEvaluation: EvaluationQuestion[];
  keyCommands: string[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  tips?: Tip[];
}

export interface CodeExample {
  description: string;
  code: string;
  output?: string;
}

export interface Tip {
  type: 'consejo' | 'nota' | 'ojo' | 'error';
  content: string;
}

export interface PracticeStep {
  step: number;
  title: string;
  instructions: string;
  commands?: string[];
  verification?: string;
}

export interface CommonError {
  error: string;
  cause: string;
  solution: string;
  diagnosticCommand?: string;
}

export interface EvaluationQuestion {
  id: number;
  question: string;
  answer?: string;
}

export interface Command {
  name: string;
  category: string;
  description: string;
  syntax: string;
  options: { flag: string; description: string }[];
  examples: { command: string; explanation: string }[];
  typicalErrors?: string[];
  safetyNote?: string;
  moduleId: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  moduleId: string;
}

// MODULE 1: Modo comando en GNU/Linux
const module1: Module = {
  id: 'modo-comando',
  number: 1,
  title: 'Modo comando en GNU/Linux',
  objective: 'Entender qué estás usando cuando abres una terminal y por qué es clave en Linux. Saber pedir ayuda sin depender de otra persona ni de copiar comandos a ciegas. Mejorar productividad, autocompletado, historial, alias. Interpretar fallos, mensajes típicos y códigos de salida. Aplicarlo a un flujo real de desarrollo, ejecutar scripts, preparar entorno, diagnosticar problemas.',
  description: 'Terminal, consola, shell, prompt, ayuda, autocompletado, historial, alias, PATH y códigos de salida.',
  labTime: '45-60 min',
  evalTime: '10 min',
  tags: ['Práctica 45-60 min', 'Errores típicos', 'Mini evaluación 10 min'],
  keyCommands: ['echo "$SHELL"', 'ps -p $$', 'pwd', 'whoami', 'hostname', 'id', 'man', 'help', 'apropos', 'info', 'history', 'alias', 'which', 'command -v', 'type', 'echo $?'],
  sections: [
    {
      id: 'terminal-shell',
      title: 'Terminal, consola y shell',
      content: 'Terminal es la aplicación o ventana donde escribes comandos (GNOME Terminal, Konsole, Windows Terminal). Consola es el entorno de texto, hoy suele estar dentro de una terminal gráfica. Shell es el programa que interpreta tus comandos, normalmente bash o zsh. La shell controla variables, alias, autocompletado, redirecciones y tuberías.',
      codeExamples: [
        { description: 'Comprobar qué shell estás usando', code: 'echo "$SHELL"' },
        { description: 'Otra forma de verificar la shell actual', code: 'ps -p $$' }
      ]
    },
    {
      id: 'prompt',
      title: 'El prompt, orientarte en 5 segundos',
      content: 'Lo típico que ves antes de escribir: usuario@equipo:directorio$. Si termina en "$", normalmente eres usuario normal. Si termina en "#", normalmente eres root, ojo con borrar o tocar sistema.',
      codeExamples: [
        { description: 'Te dice la ruta actual', code: 'pwd' },
        { description: 'Te dice el usuario actual', code: 'whoami' },
        { description: 'Te dice el nombre del equipo', code: 'hostname' },
        { description: 'Te dice tus grupos y permisos, útil cuando algo falla por permisos', code: 'id' }
      ]
    },
    {
      id: 'ayuda',
      title: 'Ayuda y documentación dentro de Linux',
      content: 'Resolver dudas desde la terminal y entender opciones reales, no inventadas.',
      codeExamples: [
        { description: 'Manual oficial del comando', code: 'man ls', output: 'Dentro de man: buscar texto con /palabra y Enter, siguiente coincidencia con n, salir con q' },
        { description: 'Ayuda de comandos internos de la shell', code: 'help cd' },
        { description: 'Ayuda rápida de comandos externos', code: 'ls --help' },
        { description: 'Busca comandos por palabra clave en manuales', code: 'apropos "search"' },
        { description: 'Documentación alternativa, a veces más completa', code: 'info coreutils' }
      ],
      tips: [{ type: 'consejo', content: 'Antes de preguntar "cómo hago X", intenta: apropos "X", man comando, comando --help' }]
    },
    {
      id: 'autocompletado',
      title: 'Autocompletado y edición de línea',
      content: 'Tab completa comandos y rutas. Si hay varias opciones, pulsa Tab dos veces para ver sugerencias.',
      codeExamples: [
        { description: 'Ir al inicio de la línea', code: 'Ctrl+a' },
        { description: 'Ir al final de la línea', code: 'Ctrl+e' },
        { description: 'Borrar desde el cursor hasta el inicio', code: 'Ctrl+u' },
        { description: 'Borrar desde el cursor hasta el final', code: 'Ctrl+k' },
        { description: 'Borrar la palabra anterior', code: 'Ctrl+w' },
        { description: 'Limpiar pantalla, no borra el historial', code: 'Ctrl+l' },
        { description: 'Interrumpir un comando en ejecución', code: 'Ctrl+c' },
        { description: 'Cerrar sesión o finalizar entrada', code: 'Ctrl+d' }
      ],
      tips: [{ type: 'nota', content: 'Si un comando parece colgado, prueba Ctrl+c antes de cerrar la ventana' }]
    },
    {
      id: 'historial',
      title: 'Historial, repetir y buscar comandos',
      content: 'Ver y reutilizar comandos anteriores de forma eficiente.',
      codeExamples: [
        { description: 'Ver el historial', code: 'history' },
        { description: 'Repite el último comando', code: '!!' },
        { description: 'Repite el comando número n del historial', code: '!n' },
        { description: 'Repite el último comando que empieza por "texto"', code: '!texto' },
        { description: 'Búsqueda inversa, escribe una parte del comando', code: 'Ctrl+r' }
      ],
      tips: [{ type: 'consejo', content: 'Ayer levantaste un entorno con "docker compose up -d", hoy lo recuperas con Ctrl+r y escribiendo "compose"' }]
    },
    {
      id: 'alias',
      title: 'Alias, atajos controlados',
      content: 'Un alias es un atajo que sustituye una palabra por un comando más largo.',
      codeExamples: [
        { description: 'Crear alias temporal (se pierde al cerrar terminal)', code: 'alias ll="ls -lah"' },
        { description: 'Crear alias para git status', code: 'alias gs="git status"' },
        { description: 'Crear alias para docker compose', code: 'alias dc="docker compose"' },
        { description: 'Ver alias actuales', code: 'alias' },
        { description: 'Quitar un alias', code: 'unalias ll' },
        { description: 'Hacer alias persistente en bash', code: '# Edita ~/.bashrc y añade: alias ll="ls -lah"' },
        { description: 'Recargar configuración', code: 'source ~/.bashrc' }
      ],
      tips: [{ type: 'consejo', content: 'Usa pocos alias, 3 a 6, si no luego no sabes los comandos reales' }]
    },
    {
      id: 'path',
      title: 'PATH y el error "command not found"',
      content: 'PATH es una lista de rutas donde la shell busca ejecutables cuando escribes un comando.',
      codeExamples: [
        { description: 'Ver tu PATH', code: 'echo "$PATH"' },
        { description: 'Saber de dónde sale un comando', code: 'which python' },
        { description: 'Otra forma de localizar un comando', code: 'command -v python' },
        { description: 'Otra forma más', code: 'type python' }
      ],
      tips: [
        { type: 'ojo', content: 'Caso típico en clase: instalas una herramienta y sale "command not found"' },
        { type: 'nota', content: 'Causas frecuentes: no está instalada, está instalada pero no está en PATH, estás en otra shell o sesión distinta a la configurada' },
        { type: 'consejo', content: 'Diagnóstico rápido: command -v herramienta. Si no devuelve nada, no está en PATH o no existe, toca instalar o corregir configuración' }
      ]
    },
    {
      id: 'exit-codes',
      title: 'Códigos de salida, saber si fue bien o mal',
      content: 'Casi todo comando devuelve un número al terminar. 0 significa que fue bien. Distinto de 0 significa fallo o condición no cumplida.',
      codeExamples: [
        { description: 'Ver el código del último comando', code: 'echo $?' },
        { description: 'Ejemplo que devuelve 0', code: 'true\necho $?' },
        { description: 'Ejemplo que devuelve distinto de 0', code: 'false\necho $?' },
        { description: 'Ejecuta comando2 solo si comando1 fue bien', code: 'comando1 && comando2' },
        { description: 'Ejecuta comando2 solo si comando1 falló', code: 'comando1 || comando2' },
        { description: 'Ejemplo real en proyecto', code: 'cd proyecto && npm install && npm test' }
      ],
      tips: [{ type: 'nota', content: 'Si falla entrar al directorio, no sigue. Si falla instalación, no lanza tests.' }]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Crear entorno de trabajo', instructions: 'Crea tu workspace de prácticas', commands: ['mkdir -p ~/workspace_linux', 'cd ~/workspace_linux', 'pwd'] },
    { step: 2, title: 'Identificar contexto', instructions: 'Verifica quién eres y dónde estás', commands: ['whoami', 'hostname', 'echo "$SHELL"'] },
    { step: 3, title: 'Usar ayuda real', instructions: 'Explora el manual de ls', commands: ['man ls', '# Busca dentro del manual la palabra "human"', '# Sal con q', 'ls --help'] },
    { step: 4, title: 'Crear alias útiles temporales', instructions: 'Crea un alias para listado largo', commands: ['alias ll="ls -lah"', 'll'] },
    { step: 5, title: 'Crear un script sencillo y ejecutarlo', instructions: 'Crea y ejecuta tu primer script', commands: ['printf \'#!/usr/bin/env bash\\necho "Hola desde script"\\n\' > hola.sh', 'ls -l hola.sh', 'chmod +x hola.sh', 'ls -l hola.sh', './hola.sh', 'echo $?'] },
    { step: 6, title: 'Provocar un error y leerlo bien', instructions: 'Observa el código de salida de un error', commands: ['./no_existe.sh', 'echo $?'] },
    { step: 7, title: 'Practicar historial', instructions: 'Usa el historial y búsqueda inversa', commands: ['history', '# Ctrl+r y busca "chmod"', '# Ejecuta solo cuando lo veas claro en pantalla'] }
  ],
  commonErrors: [
    { error: 'No such file or directory', cause: 'Estás en la ruta equivocada, o el archivo no existe', solution: 'pwd, ls, revisa mayúsculas y espacios', diagnosticCommand: 'pwd && ls' },
    { error: 'Permission denied', cause: 'No tienes permisos, o el archivo no es ejecutable', solution: 'ls -l, revisa permisos, chmod +x si es script, y entiende usuario y grupo', diagnosticCommand: 'ls -l' },
    { error: 'command not found', cause: 'No está instalado o no está en PATH', solution: 'command -v, which, type, si no aparece, toca instalar o configurar', diagnosticCommand: 'command -v herramienta' },
    { error: 'Is a directory', cause: 'Estás tratando una carpeta como si fuera archivo', solution: 'ls -l, entra con cd o usa el fichero correcto', diagnosticCommand: 'ls -l' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Di qué shell estás usando y cómo lo has comprobado', answer: 'echo "$SHELL" o ps -p $$' },
    { id: 2, question: 'Encuentra en man ls cómo listar en formato largo y con tamaños legibles', answer: 'ls -lah (dentro de man ls buscar "human-readable")' },
    { id: 3, question: 'Crea un alias "proj" que haga cd a tu workspace', answer: 'alias proj="cd ~/workspace_linux"' },
    { id: 4, question: 'Ejecuta un script y demuestra que sabes ver el código de salida', answer: './script.sh && echo $?' },
    { id: 5, question: 'Explica la diferencia entre "$" y "#", y por qué importa en seguridad y administración', answer: '$ = usuario normal, # = root. Importa porque como root puedes destruir el sistema.' }
  ]
};

// MODULE 2: Estructura del sistema de archivos
const module2: Module = {
  id: 'estructura-fhs',
  number: 2,
  title: 'Estructura del sistema de archivos',
  objective: 'Entender cómo se organiza Linux por dentro para no perderte. Saber dónde están configuraciones, logs, programas y archivos temporales. Aprender a diagnosticar fallos típicos de desarrollo: rutas mal puestas, permisos, logs que crecen, falta de disco. Trabajar como dev con orden, separar código, config y evidencias.',
  description: 'Jerarquía FHS, todo es un fichero, archivos ocultos, tipos de archivo, enlaces simbólicos.',
  labTime: '45-60 min',
  evalTime: '10 min',
  tags: ['Práctica 45-60 min', 'Errores típicos', 'Mini evaluación 10 min'],
  keyCommands: ['ls -a', 'ls -ad ~/.*', 'ls -l', 'ln -s', 'df -h', 'du -sh', 'stat'],
  sections: [
    {
      id: 'todo-fichero',
      title: 'La idea base, todo es un fichero',
      content: 'En Linux casi todo se representa como archivos y directorios. Discos, dispositivos, sockets, pseudoarchivos del sistema, todo se expone de alguna forma en el árbol de directorios. Esto te interesa como dev porque los logs son archivos, la configuración suele ser archivos de texto, y los permisos se aplican igual a scripts, carpetas, claves, etc.',
      tips: [{ type: 'consejo', content: 'Si un servicio "no arranca", muchas veces se arregla leyendo un archivo de log o revisando un archivo de config' }]
    },
    {
      id: 'fhs',
      title: 'Jerarquía FHS, lo que necesitas de verdad',
      content: 'No necesitas memorizar todo, pero sí ubicar lo importante.',
      codeExamples: [
        { description: 'Raíz - el inicio del árbol', code: 'cd /' },
        { description: 'Carpetas de usuarios, aquí sueles trabajar como alumno', code: 'cd /home' },
        { description: 'Home del usuario root', code: 'cd /root' },
        { description: 'Configuración del sistema y de servicios', code: 'ls /etc', output: 'Ejemplos: /etc/hosts, /etc/resolv.conf, /etc/ssh/sshd_config, /etc/nginx/nginx.conf' },
        { description: 'Datos variables que cambian con el tiempo', code: 'ls /var', output: '/var/log - logs, /var/lib - datos de aplicaciones, /var/www - contenido web' },
        { description: 'Programas y librerías instaladas por el sistema', code: 'ls /usr' },
        { description: 'Software opcional o de terceros', code: 'ls /opt' },
        { description: 'Archivos temporales', code: 'ls /tmp' },
        { description: 'Dispositivos', code: 'ls /dev' },
        { description: 'Pseudoarchivos del kernel', code: 'ls /proc' }
      ],
      tips: [
        { type: 'nota', content: 'Como dev, cuando configuras un servicio, suele haber algo en /etc. Si tocas algo mal, puedes romper arranque de un servicio.' },
        { type: 'consejo', content: 'Un error de tu app puede estar en /var/log. Si el disco se llena, /var es sospechoso habitual.' }
      ]
    },
    {
      id: 'ocultos',
      title: 'Archivos ocultos y configuración de usuario',
      content: 'Archivos y carpetas que empiezan por punto son "ocultos" en listados normales.',
      codeExamples: [
        { description: 'Ver ocultos', code: 'ls -a' },
        { description: 'Ver solo ocultos en tu home', code: 'ls -ad ~/.*' }
      ],
      tips: [{ type: 'nota', content: 'Tu entorno de terminal se configura en .bashrc o .zshrc. Las claves SSH viven en .ssh. Herramientas guardan configuración en .config' }]
    },
    {
      id: 'tipos-archivo',
      title: 'Tipos de archivo y cómo leer un ls -l',
      content: 'ls -l te da una línea por archivo con permisos, propietario, grupo, tamaño, fecha y nombre. El primer carácter del modo indica tipo.',
      codeExamples: [
        { description: 'Fichero normal', code: '-', output: '"-" fichero normal' },
        { description: 'Directorio', code: 'd', output: '"d" directorio' },
        { description: 'Enlace simbólico', code: 'l', output: '"l" enlace simbólico' },
        { description: 'Dispositivo de caracteres', code: 'c', output: '"c" dispositivo de caracteres' },
        { description: 'Dispositivo de bloques', code: 'b', output: '"b" dispositivo de bloques' }
      ],
      tips: [{ type: 'consejo', content: 'Si ves una "d", es carpeta. Si ves una "l", apunta a otro sitio, muy importante cuando algo "no está donde crees".' }]
    },
    {
      id: 'enlaces',
      title: 'Enlaces simbólicos en proyectos, lo justo y útil',
      content: 'Un enlace simbólico es un "atajo" a otro archivo o directorio, como un acceso directo. Se crea con ln -s.',
      codeExamples: [
        { description: 'Crear un enlace simbólico', code: 'ln -s /ruta/origen /ruta/enlace' },
        { description: 'Comprobarlo', code: 'ls -l', output: 'config.json -> /etc/miapp/config.json' }
      ],
      tips: [
        { type: 'ojo', content: 'Error típico: Enlace roto. El origen se movió o borró. ls -l te lo enseña y al abrirlo falla con "No such file or directory"' },
        { type: 'consejo', content: 'Caso real dev: Quieres que tu app lea siempre de ~/proyecto/config/app.env pero en realidad el archivo vive en otra ruta' }
      ]
    },
    {
      id: 'estructura-alumno',
      title: 'Donde trabajar como alumnado, estructura recomendada',
      content: 'Regla simple: En /home va tu trabajo. En /etc no tocas salvo práctica guiada de admin. En /var/log lees, no escribes, salvo casos concretos.',
      codeExamples: [
        { description: 'Estructura recomendada', code: 'mkdir -p ~/workspace/{proyectos,scripts,evidencias,logs}' }
      ],
      tips: [{ type: 'consejo', content: 'Esto te evita el caos de "tengo 20 carpetas en el Escritorio" y luego no encuentra nada' }]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Explorar raíz y ubicar carpetas importantes', instructions: 'Navega a la raíz y explora', commands: ['cd /', 'ls', 'pwd'] },
    { step: 2, title: 'Entrar en /home y ver usuarios', instructions: 'Explora /home y vuelve a tu home', commands: ['cd /home', 'ls', 'cd ~', 'pwd'] },
    { step: 3, title: 'Ver ocultos', instructions: 'Compara ls normal con ls -a', commands: ['ls', 'ls -a'] },
    { step: 4, title: 'Localizar configuración y logs', instructions: 'Explora /etc y /var/log', commands: ['ls /etc | head', 'ls /var', 'ls /var/log | head'] },
    { step: 5, title: 'Crear estructura recomendada del alumno', instructions: 'Crea tu workspace organizado', commands: ['mkdir -p ~/workspace/proyectos', 'mkdir -p ~/workspace/scripts', 'mkdir -p ~/workspace/evidencias', 'mkdir -p ~/workspace/logs', 'cd ~/workspace', 'ls', 'pwd'] },
    { step: 6, title: 'Crear un archivo de ejemplo y ver sus metadatos', instructions: 'Crea archivo y examina sus propiedades', commands: ['touch ~/workspace/evidencias/info.txt', 'ls -l ~/workspace/evidencias', 'stat ~/workspace/evidencias/info.txt'] },
    { step: 7, title: 'Enlace simbólico de práctica', instructions: 'Crea y prueba un enlace simbólico', commands: ['ln -s ~/workspace/evidencias ~/workspace/atajo_evidencias', 'ls -l ~/workspace', 'cd ~/workspace/atajo_evidencias', 'pwd'] }
  ],
  commonErrors: [
    { error: 'No such file or directory', cause: 'Estás en otra ruta, o el archivo no existe', solution: 'pwd, ls, revisa si era un enlace roto con ls -l', diagnosticCommand: 'pwd && ls -l' },
    { error: 'Permission denied al entrar o listar', cause: 'No tienes permisos sobre esa carpeta', solution: 'Vuelve a /home, no fuerces con sudo si no toca', diagnosticCommand: 'cd ~' },
    { error: 'Read-only file system', cause: 'Estás intentando escribir en un sitio montado como solo lectura', solution: 'Cambia tu trabajo a tu home, o revisa montaje', diagnosticCommand: 'cd ~' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Explica para qué sirve /etc y pon un ejemplo de archivo que podría haber ahí', answer: '/etc contiene configuración del sistema. Ejemplos: /etc/hosts, /etc/ssh/sshd_config' },
    { id: 2, question: 'Explica para qué sirve /var/log y qué tipo de información esperas encontrar', answer: 'Logs del sistema y servicios. Información de errores, accesos, eventos.' },
    { id: 3, question: 'Muestra un archivo oculto en tu home y di por qué es útil', answer: '.bashrc - configura el entorno de la shell. .ssh - contiene claves SSH.' },
    { id: 4, question: 'Crea la estructura ~/workspace y demuestra que sabes moverte dentro', answer: 'mkdir -p ~/workspace/{proyectos,scripts,evidencias,logs}' },
    { id: 5, question: 'Crea un enlace simbólico y comprueba que existe con ls -l', answer: 'ln -s ~/origen ~/enlace && ls -l ~' }
  ]
};

// MODULE 3: Rutas
const module3: Module = {
  id: 'rutas',
  number: 3,
  title: 'Rutas',
  objective: 'Saber moverte sin perderte, entender dónde estás y a dónde apuntas. Distinguir rutas absolutas y relativas, y cuándo te conviene cada una. Evitar el 50 por ciento de fallos típicos en clase: rutas mal escritas, ejecución desde carpeta equivocada. Usar patrones en nombres de archivos para trabajar rápido sin seleccionar con el ratón.',
  description: 'Rutas absolutas, relativas, home, espacios en nombres, globbing.',
  labTime: '45-60 min',
  evalTime: '10 min',
  tags: ['Práctica 45-60 min', 'Errores típicos', 'Mini evaluación 10 min'],
  keyCommands: ['pwd', 'ls', 'cd', 'cd -', 'which', 'command -v', 'type'],
  sections: [
    {
      id: 'concepto-ruta',
      title: 'Concepto base, qué es una ruta',
      content: 'Una ruta identifica la ubicación de un archivo o directorio dentro del sistema de archivos. En Linux, las rutas usan "/" como separador. Las rutas son sensibles a mayúsculas y minúsculas. Proyecto y proyecto no son lo mismo.',
      codeExamples: [
        { description: 'Ejemplo de ruta', code: '/home/pablo/proyecto/README.md', output: 'Esa ruta tiene un directorio y un archivo, si lo escribes mal, no lo encuentra' }
      ]
    },
    {
      id: 'rutas-absolutas',
      title: 'Rutas absolutas',
      content: 'Una ruta absoluta empieza desde la raíz "/". No depende de dónde estás situado.',
      codeExamples: [
        { description: 'Ejemplos de rutas absolutas', code: '/home/usuario/workspace\n/var/log/syslog\n/etc/hosts' }
      ],
      tips: [{ type: 'consejo', content: 'Cuándo usarlas en desarrollo: Cuando haces scripts o automatizaciones y quieres que funcionen siempre igual. Cuando estás arreglando un problema y no quieres dudas de contexto. Cuando un comando falla y sospechas que estás en otra carpeta.' }]
    },
    {
      id: 'rutas-relativas',
      title: 'Rutas relativas',
      content: 'Una ruta relativa depende del directorio actual. No empieza por "/".',
      codeExamples: [
        { description: 'Ejemplos de rutas relativas', code: 'proyecto\n./hola.sh\nlogs/app.log\n../otro_proyecto' },
        { description: '. significa "directorio actual"', code: 'cd proyecto' },
        { description: '.. significa "directorio padre"', code: 'cd ..' }
      ],
      tips: [{ type: 'consejo', content: 'Cuándo usarlas: Cuando trabajas dentro de un proyecto y quieres comandos cortos. Cuando estás en la estructura correcta y no quieres escribir rutas largas.' }]
    },
    {
      id: 'home',
      title: 'El directorio home y el símbolo "~"',
      content: '~ representa tu home, normalmente /home/tu_usuario. Es muy útil para no escribir tu usuario cada vez.',
      codeExamples: [
        { description: 'Ir al home', code: 'cd ~' },
        { description: 'Ir a workspace en home', code: 'cd ~/workspace' },
        { description: 'Listar proyectos', code: 'ls ~/workspace/proyectos' }
      ],
      tips: [{ type: 'nota', content: '~ funciona en la shell, no es un directorio real. Si copias esa ruta a un programa que no pasa por shell, a veces no se interpreta igual.' }]
    },
    {
      id: 'espacios',
      title: 'Nombres con espacios y caracteres raros',
      content: 'Evita espacios en nombres de proyectos y carpetas, te ahorras problemas. Si ya existen espacios, tienes dos opciones.',
      codeExamples: [
        { description: 'Escapar el espacio con barra invertida', code: 'cd Mi\\ Proyecto' },
        { description: 'Usar comillas', code: 'cd "Mi Proyecto"' },
        { description: 'Esto falla', code: 'cd Mi Proyecto', output: 'Interpreta Mi como carpeta y Proyecto como otro argumento, falla o hace otra cosa' }
      ]
    },
    {
      id: 'globbing',
      title: 'Patrones de nombres, globbing, trabajar rápido con muchos archivos',
      content: 'Globbing son patrones que interpreta la shell para expandir nombres de archivos. Ojo, no es regex, es otra cosa.',
      codeExamples: [
        { description: '* - cualquier cadena, incluso vacía', code: 'ls *.txt', output: 'Lista todos los txt del directorio' },
        { description: '? - un solo carácter', code: 'ls log?.txt', output: 'log1.txt, log2.txt, pero no log10.txt' },
        { description: '[] - conjunto de caracteres', code: 'ls archivo[1-3].csv', output: 'archivo1.csv, archivo2.csv, archivo3.csv' },
        { description: '{} - alternativas', code: 'touch config_{dev,prod}.env', output: 'Crea config_dev.env y config_prod.env' },
        { description: 'Caso real dev', code: 'ls logs/2026-02-*', output: 'Te lista todos los logs de febrero de 2026' }
      ],
      tips: [{ type: 'ojo', content: 'Error típico: "No matches found" o el comando no encuentra nada. Significa que el patrón no coincide con ningún archivo en esa ruta.' }]
    },
    {
      id: 'rutas-scripts',
      title: 'Rutas relativas en scripts, el error más común en proyectos',
      content: 'Problema clásico: Un script usa rutas relativas, pero lo ejecutas desde otra carpeta y falla.',
      codeExamples: [
        { description: 'Tu script hace', code: 'cat logs/app.log', output: 'Si lo ejecutas desde fuera del proyecto, no existe esa ruta' }
      ],
      tips: [
        { type: 'consejo', content: 'Solución práctica 1: Antes de ejecutar, entra al proyecto: cd ~/workspace/proyectos/miapp && ./scripts/run.sh' },
        { type: 'consejo', content: 'Solución práctica 2: O en el script, fijar ruta base a la carpeta del script' }
      ]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Crear estructura de práctica', instructions: 'Crea la estructura de carpetas', commands: ['mkdir -p ~/workspace/rutas_practica/proyecto/logs', 'mkdir -p ~/workspace/rutas_practica/proyecto/scripts', 'cd ~/workspace/rutas_practica', 'pwd'] },
    { step: 2, title: 'Crear archivos de ejemplo', instructions: 'Crea archivos de log y README', commands: ['touch proyecto/logs/app_01.log', 'touch proyecto/logs/app_02.log', 'touch proyecto/logs/app_10.log', 'touch proyecto/README.md'] },
    { step: 3, title: 'Moverte con rutas relativas', instructions: 'Navega usando rutas relativas', commands: ['cd proyecto', 'pwd', 'ls', 'cd logs', 'pwd'] },
    { step: 4, title: 'Listar con patrones', instructions: 'Usa globbing para filtrar archivos', commands: ['ls app_*.log', 'ls app_0?.log', 'ls app_[0-2][0-9].log'] },
    { step: 5, title: 'Volver atrás con ..', instructions: 'Sube al directorio padre', commands: ['cd ..', 'pwd', 'ls'] },
    { step: 6, title: 'Usar ruta absoluta para entrar directo', instructions: 'Navega con ruta absoluta', commands: ['cd ~/workspace/rutas_practica/proyecto/logs', 'pwd'] },
    { step: 7, title: 'Probar cd -', instructions: 'Alterna entre dos directorios', commands: ['cd ~/workspace/rutas_practica', 'cd ~/workspace/rutas_practica/proyecto/logs', 'cd -', 'cd -'] },
    { step: 8, title: 'Crear una carpeta con espacios y ver el problema', instructions: 'Prueba el problema de los espacios', commands: ['mkdir -p ~/workspace/rutas_practica/"Mi Proyecto"', 'cd ~/workspace/rutas_practica/"Mi Proyecto"', 'pwd', '# Intenta esto a propósito y observa el fallo:', 'cd Mi Proyecto', '# Después hazlo bien:', 'cd "Mi Proyecto"'] }
  ],
  commonErrors: [
    { error: 'No such file or directory', cause: 'Ruta mal escrita, estás en otra carpeta, o el archivo no existe', solution: 'pwd, ls, usa Tab, revisa mayúsculas', diagnosticCommand: 'pwd && ls' },
    { error: 'Permission denied al entrar en una ruta', cause: 'No tienes permisos', solution: 'Vuelve a tu home, no fuerces con sudo si no es una práctica concreta', diagnosticCommand: 'cd ~' },
    { error: 'Too many levels of symbolic links', cause: 'Te has metido en un bucle de enlaces', solution: 'Revisa enlaces con ls -l, corrige el origen', diagnosticCommand: 'ls -l' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Da un ejemplo de ruta absoluta y otro de ruta relativa para el mismo sitio', answer: 'Absoluta: /home/usuario/proyecto. Relativa: proyecto (si estás en /home/usuario)' },
    { id: 2, question: 'Explica qué hacen ., .. y ~ con un ejemplo cada uno', answer: '. = directorio actual, .. = directorio padre, ~ = home del usuario' },
    { id: 3, question: 'Usa un patrón para listar solo los logs app_0?.log', answer: 'ls app_0?.log' },
    { id: 4, question: 'Demuestra que sabes volver al directorio anterior con cd -', answer: 'cd - (alterna entre el directorio actual y el anterior)' },
    { id: 5, question: 'Explica por qué los espacios en nombres dan problemas y cómo los solucionas con comillas', answer: 'El shell interpreta el espacio como separador de argumentos. Solución: cd "Mi Proyecto"' }
  ]
};

// MODULE 4: Comandos básicos
const module4: Module = {
  id: 'comandos-basicos',
  number: 4,
  title: 'Comandos básicos',
  objective: 'Saber hacer lo esencial sin depender de interfaz gráfica. Manejar directorios y ficheros con seguridad, sin liarla con borrados. Aprender comandos que se usan en desarrollo a diario: copiar, mover, renombrar, inspeccionar, comparar. Empezar a leer salidas y a elegir opciones útiles, no usar comandos a lo loco.',
  description: 'Navegación, listados, crear/borrar directorios, copiar, mover, visualizar ficheros.',
  labTime: '60-90 min',
  evalTime: '10-15 min',
  tags: ['Práctica 60-90 min', 'Errores típicos', 'Mini evaluación 10-15 min'],
  keyCommands: ['ls', 'cd', 'pwd', 'mkdir', 'rmdir', 'rm', 'cp', 'mv', 'touch', 'cat', 'less', 'head', 'tail', 'wc', 'file', 'stat', 'diff', 'sort', 'uniq', 'cut', 'tr', 'tree', 'du', 'df'],
  sections: [
    {
      id: 'navegacion',
      title: 'Navegación y orientación',
      content: 'Comandos básicos para moverte por el sistema de archivos.',
      codeExamples: [
        { description: 'Muestra el directorio actual', code: 'pwd' },
        { description: 'Lista el contenido del directorio actual', code: 'ls' },
        { description: 'Cambia de directorio', code: 'cd ruta' },
        { description: 'Sin argumentos, vuelve a tu home', code: 'cd' },
        { description: 'Sube un nivel', code: 'cd ..' },
        { description: 'Vuelve al directorio anterior', code: 'cd -' }
      ],
      tips: [{ type: 'consejo', content: 'Ejemplo típico: ir a un proyecto y volver. cd ~/workspace/proyectos/miapp && pwd && cd -' }]
    },
    {
      id: 'listados',
      title: 'Listado útil de contenidos',
      content: 'Opciones útiles de ls para diferentes situaciones.',
      codeExamples: [
        { description: 'Listado largo, permisos, propietario, tamaño, fecha', code: 'ls -l' },
        { description: 'Incluye archivos ocultos', code: 'ls -a' },
        { description: 'Combinación muy usada: largo, ocultos, tamaños legibles', code: 'ls -lah' },
        { description: 'Ordena por fecha, lo más reciente arriba', code: 'ls -lt' },
        { description: 'Ordena por tamaño, útil cuando buscas "qué ocupa tanto"', code: 'ls -lhS' }
      ],
      tips: [{ type: 'consejo', content: 'Aprende a leer al menos permisos, tamaño y nombre, el resto lo irás pillando.' }]
    },
    {
      id: 'directorios',
      title: 'Crear y borrar directorios con cabeza',
      content: 'Gestión segura de carpetas.',
      codeExamples: [
        { description: 'Crea una carpeta', code: 'mkdir carpeta' },
        { description: 'Crea toda la ruta, aunque no existan carpetas intermedias', code: 'mkdir -p ruta/larga/de/carpetas' },
        { description: 'Borra una carpeta vacía', code: 'rmdir carpeta' },
        { description: 'Borra carpeta con contenido, peligro si no estás seguro', code: 'rm -r carpeta' }
      ],
      tips: [
        { type: 'ojo', content: 'Regla de oro para no liarla: Antes de borrar algo grande, haz pwd && ls. Y si quieres ir a lo seguro, primero lista lo que vas a borrar.' },
        { type: 'error', content: 'NO ejecutes nunca: rm -r /' }
      ]
    },
    {
      id: 'copiar-mover',
      title: 'Copiar y mover',
      content: 'Gestión de archivos y carpetas.',
      codeExamples: [
        { description: 'Copia archivos', code: 'cp origen destino' },
        { description: 'Copia carpetas con su contenido', code: 'cp -r carpeta_origen carpeta_destino' },
        { description: 'Mueve o renombra', code: 'mv origen destino' },
        { description: 'Duplicar un archivo de configuración de ejemplo', code: 'cp .env.example .env' }
      ],
      tips: [{ type: 'consejo', content: 'Caso dev muy común: cp .env.example .env' }]
    },
    {
      id: 'buscar-contar',
      title: 'Buscar y contar rápido a nivel de directorios',
      content: 'Herramientas para analizar el sistema de archivos.',
      codeExamples: [
        { description: 'Muestra el árbol, si está instalado', code: 'tree' },
        { description: 'Tamaño total de una carpeta', code: 'du -sh carpeta' },
        { description: 'Espacio disponible en discos', code: 'df -h' },
        { description: 'Tamaño de cada elemento en la carpeta actual', code: 'du -sh *' }
      ]
    },
    {
      id: 'crear-editar',
      title: 'Crear y editar muy básico',
      content: 'Crear archivos rápidamente.',
      codeExamples: [
        { description: 'Crea un fichero vacío o actualiza su fecha', code: 'touch fichero' },
        { description: 'Ejemplo', code: 'touch notas.txt' },
        { description: 'Crear en subcarpeta', code: 'touch logs/app.log' }
      ]
    },
    {
      id: 'ver-contenido',
      title: 'Ver contenido de archivos',
      content: 'Diferentes formas de visualizar archivos según el tamaño y necesidad.',
      codeExamples: [
        { description: 'Muestra el contenido entero, para archivos pequeños', code: 'cat fichero' },
        { description: 'Visor paginado, ideal para logs y archivos grandes', code: 'less fichero' },
        { description: 'Dentro de less: buscar /texto, siguiente n, salir q', code: '' },
        { description: 'Muestra las primeras 10 líneas', code: 'head fichero' },
        { description: 'Muestra 50 líneas', code: 'head -n 50 fichero' },
        { description: 'Muestra las últimas 10 líneas', code: 'tail fichero' },
        { description: 'Muestra 50 últimas líneas', code: 'tail -n 50 fichero' },
        { description: 'Sigue un log en tiempo real', code: 'tail -f fichero.log' }
      ],
      tips: [{ type: 'consejo', content: 'Ejemplos reales: less /var/log/syslog, tail -n 100 logs/app.log, tail -f logs/app.log' }]
    },
    {
      id: 'medir-contar',
      title: 'Medir, contar y entender ficheros',
      content: 'Obtener información sobre archivos.',
      codeExamples: [
        { description: 'Cuenta líneas, palabras y caracteres', code: 'wc fichero' },
        { description: 'Solo líneas', code: 'wc -l fichero' },
        { description: 'Te dice qué tipo de archivo es', code: 'file fichero' },
        { description: 'Muestra metadatos, permisos, fechas, tamaño, inodos', code: 'stat fichero' }
      ]
    },
    {
      id: 'comparar',
      title: 'Comparar archivos, clave para config y código',
      content: 'Herramientas para comparar archivos.',
      codeExamples: [
        { description: 'Te muestra diferencias línea a línea', code: 'diff archivo1 archivo2' },
        { description: 'Formato unificado, más legible y usado en desarrollo', code: 'diff -u archivo1 archivo2' },
        { description: 'Comparación binaria simple', code: 'cmp archivo1 archivo2' },
        { description: 'Caso dev típico', code: 'diff -u config_ok.conf config_mala.conf' }
      ]
    },
    {
      id: 'extraer',
      title: 'Copiar fragmentos y extraer información simple',
      content: 'Manipulación básica de texto.',
      codeExamples: [
        { description: 'Ordena líneas', code: 'sort fichero' },
        { description: 'Elimina duplicados consecutivos, suele usarse junto con sort', code: 'uniq fichero' },
        { description: 'Extrae columnas por separador', code: 'cut -d"," -f1 archivo.csv' },
        { description: 'Traduce o elimina caracteres', code: 'echo "hola" | tr a-z A-Z' }
      ]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Crear estructura de práctica', instructions: 'Crea la estructura del proyecto', commands: ['mkdir -p ~/workspace/comandos_basicos/proyecto/logs', 'mkdir -p ~/workspace/comandos_basicos/proyecto/config', 'mkdir -p ~/workspace/comandos_basicos/proyecto/scripts', 'cd ~/workspace/comandos_basicos/proyecto', 'pwd'] },
    { step: 2, title: 'Crear archivos', instructions: 'Crea archivos básicos', commands: ['touch README.md', 'touch logs/app.log', 'touch config/app.conf'] },
    { step: 3, title: 'Escribir contenido rápido en archivos', instructions: 'Añade contenido a los archivos', commands: ['printf "PORT=8080\\nENV=dev\\n" > config/app.conf', 'printf "INFO arrancando\\nERROR fallo de conexion\\nINFO reintentando\\n" > logs/app.log'] },
    { step: 4, title: 'Inspeccionar contenido con herramientas correctas', instructions: 'Visualiza el contenido de diferentes formas', commands: ['cat README.md', 'less logs/app.log', 'head -n 2 logs/app.log', 'tail -n 2 logs/app.log'] },
    { step: 5, title: 'Copiar y modificar config', instructions: 'Haz backup y modifica', commands: ['cp config/app.conf config/app.conf.bak', 'printf "PORT=9090\\nENV=dev\\n" > config/app.conf'] },
    { step: 6, title: 'Comparar config buena y mala', instructions: 'Usa diff para ver diferencias', commands: ['diff -u config/app.conf.bak config/app.conf'] },
    { step: 7, title: 'Listar con detalle y entender permisos', instructions: 'Examina los permisos', commands: ['ls -lah', 'ls -lah config', 'ls -lah logs'] },
    { step: 8, title: 'Mover y renombrar', instructions: 'Renombra archivos', commands: ['mv logs/app.log logs/app_01.log', 'ls -lah logs'] },
    { step: 9, title: 'Borrar una carpeta de prueba de forma segura', instructions: 'Elimina con precaución', commands: ['cd ~/workspace/comandos_basicos', 'ls -lah', 'rm -r proyecto'] }
  ],
  commonErrors: [
    { error: 'rm: cannot remove ... Permission denied', cause: 'No tienes permisos', solution: 'Revisa propietario y permisos con ls -l, no uses sudo por inercia', diagnosticCommand: 'ls -l' },
    { error: 'cp: omitting directory', cause: 'Has intentado copiar una carpeta sin -r', solution: 'Usa cp -r', diagnosticCommand: 'cp -r origen destino' },
    { error: 'cat: ... Is a directory', cause: 'Estás intentando leer una carpeta como archivo', solution: 'Usa ls para ver el contenido o entra con cd', diagnosticCommand: 'ls -l' },
    { error: 'tail -f no muestra nada', cause: 'El archivo no cambia o estás mirando otro log', solution: 'Confirma la ruta con pwd y comprueba que el log se escribe de verdad', diagnosticCommand: 'pwd && ls -l' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Crea una carpeta con mkdir -p y demuestra que se crearon subcarpetas', answer: 'mkdir -p ruta/larga/de/carpetas && ls -R ruta' },
    { id: 2, question: 'Lista con ls -lah y explica qué parte indica permisos y tamaño', answer: 'ls -lah muestra: permisos | enlaces | usuario | grupo | tamaño | fecha | nombre' },
    { id: 3, question: 'Crea un archivo con touch, escribe dos líneas con printf y muéstralo con cat', answer: 'touch test.txt && printf "linea1\\nlinea2\\n" > test.txt && cat test.txt' },
    { id: 4, question: 'Usa head y tail para ver solo el inicio y el final de un log', answer: 'head -n 5 log.txt && tail -n 5 log.txt' },
    { id: 5, question: 'Copia una config, modifícala y usa diff -u para enseñar las diferencias', answer: 'cp config.conf config.conf.bak && # modifica config.conf && diff -u config.conf.bak config.conf' }
  ]
};

// MODULE 5: Editores de texto
const module5: Module = {
  id: 'editores',
  number: 5,
  title: 'Editores de texto',
  objective: 'Poder editar archivos desde terminal sin depender de interfaz gráfica. Saber hacer cambios rápidos en configuraciones y scripts sin romper el sistema. Usar un editor sencillo para emergencias y uno más potente para cuando toca trabajar en remoto. Aprender a salir sin atascarte, esto pasa mucho al principio.',
  description: 'Nano para cambios rápidos, Vim mínimo viable para supervivencia.',
  labTime: '30-45 min',
  evalTime: '10-15 min',
  tags: ['Práctica 30-45 min', 'Errores típicos', 'Mini evaluación 10-15 min'],
  keyCommands: ['nano', 'vim', 'Ctrl+O', 'Ctrl+X', 'Ctrl+W', ':wq', ':q!'],
  sections: [
    {
      id: 'elegir-editor',
      title: 'Elegir editor según la situación',
      content: 'Regla simple para clase: nano para empezar y para cambios rápidos, vim para saber lo mínimo en servidores o cuando no hay otra cosa.',
      tips: [
        { type: 'consejo', content: 'Editar un archivo .env o una configuración simple: nano' },
        { type: 'consejo', content: 'Arreglar un fichero de config en una VM o servidor sin entorno gráfico: vim' },
        { type: 'consejo', content: 'Ver un archivo sin editar, mejor less o cat, no abras editor si no hace falta' }
      ]
    },
    {
      id: 'nano',
      title: 'Nano, lo necesario para no sufrir',
      content: 'Editor sencillo para cambios rápidos.',
      codeExamples: [
        { description: 'Abrir un archivo', code: 'nano archivo.txt', output: 'Si el archivo no existe, lo crea al guardar' },
        { description: 'Guardar (^ = Ctrl)', code: 'Ctrl+O', output: 'Te pide el nombre, Enter confirma' },
        { description: 'Salir', code: 'Ctrl+X', output: 'Si hay cambios te pregunta si quieres guardar' },
        { description: 'Buscar texto', code: 'Ctrl+W' },
        { description: 'Cortar línea actual', code: 'Ctrl+K' },
        { description: 'Pegar lo cortado', code: 'Ctrl+U' },
        { description: 'Ayuda', code: 'Ctrl+G' }
      ],
      tips: [{ type: 'ojo', content: 'Si editas un archivo de configuración, revisa que no has metido espacios o tabulaciones raras, sobre todo en YAML' }]
    },
    {
      id: 'vim',
      title: 'Vim, el mínimo viable para supervivencia',
      content: 'No vamos a convertir esto en un curso de vim. El objetivo es que no te quedes atrapado y puedas hacer un cambio rápido.',
      codeExamples: [
        { description: 'Abrir un archivo', code: 'vim archivo.txt' },
        { description: 'Modos: Normal (por defecto, moverte y ejecutar)', code: '' },
        { description: 'Modos: Insert (para escribir texto)', code: 'i (entrar), Esc (salir)' },
        { description: 'Modos: Command (guardar, salir, buscar)', code: ':' },
        { description: 'Si te pierdes', code: 'Pulsa Esc un par de veces y vuelves a modo normal' },
        { description: 'Entrar a escribir', code: 'i' },
        { description: 'Dejar de escribir', code: 'Esc' },
        { description: 'Guardar y salir', code: ':wq' },
        { description: 'Guardar sin salir', code: ':w' },
        { description: 'Salir sin guardar', code: ':q!' },
        { description: 'Buscar texto', code: '/palabra, Enter para buscar, n para siguiente' },
        { description: 'Reemplazo simple en todo el archivo', code: ':%s/viejo/nuevo/g' },
        { description: 'Reemplazo con confirmación', code: ':%s/viejo/nuevo/gc' }
      ]
    },
    {
      id: 'buenas-practicas',
      title: 'Buenas prácticas al editar configuraciones',
      content: 'Reglas para no romper nada.',
      tips: [
        { type: 'consejo', content: 'Regla 1: Haz copia antes de tocar: cp archivo.conf archivo.conf.bak' },
        { type: 'consejo', content: 'Regla 2: Cambia una cosa cada vez, si rompes algo sabrás qué fue' },
        { type: 'consejo', content: 'Regla 3: Si es un servicio real, tras editar revisa sintaxis si existe un comando de test' },
        { type: 'consejo', content: 'Regla 4: Después de cambiar, compara con diff: diff -u archivo.conf.bak archivo.conf' }
      ]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Crear carpeta de práctica', instructions: 'Prepara el entorno', commands: ['mkdir -p ~/workspace/editores_practica', 'cd ~/workspace/editores_practica'] },
    { step: 2, title: 'Crear un archivo .env con nano', instructions: 'Edita con nano', commands: ['nano .env', '# Escribe dentro:', 'APP_ENV=dev', 'PORT=8080', '# Guarda y sal: Ctrl+O, Enter, Ctrl+X', 'cat .env'] },
    { step: 3, title: 'Crear un script con nano', instructions: 'Crea y prueba un script', commands: ['nano run.sh', '# Escribe dentro:', '#!/usr/bin/env bash', 'echo "Entorno: $APP_ENV"', 'echo "Puerto: $PORT"', '# Guarda y sal: Ctrl+O, Enter, Ctrl+X', 'chmod +x run.sh', './run.sh'] },
    { step: 4, title: 'Practicar con vim', instructions: 'Edita con vim', commands: ['printf "PORT=8080\\nENV=dev\\nPORT=8080\\n" > config.txt', 'vim config.txt', '# /PORT y Enter para buscar', '# i para entrar en insert y cambia 8080 por 9090', '# Esc', '# :wq para guardar y salir', 'cat config.txt'] },
    { step: 5, title: 'Reemplazo global en vim', instructions: 'Usa reemplazo global', commands: ['vim config.txt', ':%s/8080/7070/g', ':wq', 'cat config.txt'] }
  ],
  commonErrors: [
    { error: 'Me he quedado atrapado en vim', cause: 'No sabes qué modo estás usando', solution: 'Esc, luego :q! y Enter', diagnosticCommand: 'Esc :q!' },
    { error: 'No puedo guardar', cause: 'Puede ser permisos o fichero de solo lectura', solution: 'Esc, :q! para salir sin perder el control, luego revisa permisos', diagnosticCommand: 'ls -l' },
    { error: 'He roto el archivo de config y ya no funciona', cause: 'Cambio incorrecto', solution: 'Restaura la copia: mv archivo.conf.bak archivo.conf', diagnosticCommand: 'diff -u archivo.conf.bak archivo.conf' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Abre un archivo con nano, escribe dos líneas, guarda y sal', answer: 'nano archivo.txt, escribe, Ctrl+O, Enter, Ctrl+X' },
    { id: 2, question: 'Abre el mismo archivo con vim, cambia una palabra, guarda y sal', answer: 'vim archivo.txt, i para insertar, edita, Esc, :wq' },
    { id: 3, question: 'Haz una copia .bak antes de editar un archivo de config', answer: 'cp config.conf config.conf.bak' },
    { id: 4, question: 'Demuestra que sabes salir de vim sin guardar', answer: 'Esc, :q!, Enter' },
    { id: 5, question: 'Usa diff -u para comparar el archivo original y el modificado', answer: 'diff -u original.conf modificado.conf' }
  ]
};

// MODULE 6: Visualización de ficheros
const module6: Module = {
  id: 'visualizacion',
  number: 6,
  title: 'Visualización de ficheros',
  objective: 'Leer archivos en Linux de forma cómoda y eficiente. Saber inspeccionar logs sin abrir editores ni saturar la pantalla. Aprender a localizar información relevante en archivos grandes. Tener un método para diagnosticar errores de aplicaciones leyendo trazas y mensajes.',
  description: 'cat, less, head, tail, tail -f para leer archivos de forma eficiente.',
  labTime: '60 min',
  evalTime: '10-15 min',
  tags: ['Práctica 60 min', 'Errores típicos', 'Mini evaluación 10-15 min'],
  keyCommands: ['cat', 'cat -n', 'less', 'head', 'tail', 'tail -f', 'nl', 'tac'],
  sections: [
    {
      id: 'elegir-herramienta',
      title: 'Elegir herramienta según el tamaño y el objetivo',
      content: 'Regla simple: Archivo pequeño → cat. Archivo grande → less. Quiero ver el inicio → head. Quiero ver el final → tail. Quiero seguir un log en tiempo real → tail -f.',
      tips: [{ type: 'consejo', content: 'Caso real de dev: Si tu app falla, lo más normal es que el mensaje útil esté al final del log. En ese caso, tail suele ser lo primero que pruebas.' }]
    },
    {
      id: 'cat',
      title: 'cat, ver contenido completo',
      content: 'Muestra el archivo entero por pantalla.',
      codeExamples: [
        { description: 'Muestra el archivo', code: 'cat fichero.txt' },
        { description: 'Muestra números de línea', code: 'cat -n fichero.txt', output: 'Ayuda a referenciar errores' }
      ],
      tips: [{ type: 'ojo', content: 'Error típico: Si el archivo es enorme, cat te inunda la terminal. En ese caso usa less.' }]
    },
    {
      id: 'less',
      title: 'less, leer sin morir con archivos grandes',
      content: 'Te permite navegar por un archivo página a página, con búsqueda.',
      codeExamples: [
        { description: 'Abrir', code: 'less fichero.log' },
        { description: 'Avanza una página', code: 'Espacio' },
        { description: 'Retrocede una página', code: 'b' },
        { description: 'Avanza una línea', code: 'Enter' },
        { description: 'Salir', code: 'q' },
        { description: 'Busca hacia adelante', code: '/texto' },
        { description: 'Siguiente coincidencia', code: 'n' },
        { description: 'Coincidencia anterior', code: 'N' }
      ],
      tips: [{ type: 'consejo', content: 'Less es el "visor universal", si no sabes qué usar, usa less.' }]
    },
    {
      id: 'head',
      title: 'head, ver el inicio',
      content: 'Muestra las primeras líneas de un archivo.',
      codeExamples: [
        { description: 'Por defecto 10 líneas', code: 'head fichero.txt' },
        { description: 'Muestra 50 líneas', code: 'head -n 50 fichero.txt' },
        { description: 'Ver cabeceras de CSV', code: 'head -n 1 datos.csv' }
      ]
    },
    {
      id: 'tail',
      title: 'tail, ver el final',
      content: 'Muestra las últimas líneas de un archivo.',
      codeExamples: [
        { description: 'Por defecto 10 líneas', code: 'tail fichero.log' },
        { description: 'Muestra 50 últimas líneas', code: 'tail -n 50 fichero.log' },
        { description: 'Caso dev típico', code: 'tail -n 100 logs/app.log', output: 'La traza del error suele estar al final, tail es tu amigo' }
      ]
    },
    {
      id: 'tail-f',
      title: 'tail -f, seguir logs en tiempo real',
      content: 'Se queda escuchando el archivo y te muestra nuevas líneas a medida que se escriben.',
      codeExamples: [
        { description: 'Seguir un log', code: 'tail -f fichero.log' },
        { description: 'Cómo parar', code: 'Ctrl+c' }
      ],
      tips: [
        { type: 'consejo', content: 'Caso real de desarrollo: Arrancas una app en una terminal y en otra haces tail -f del log. Así ves qué ocurre según pruebas endpoints o acciones.' },
        { type: 'ojo', content: 'Error típico: No aparecen líneas nuevas. Causas: el programa no está escribiendo en ese log, estás mirando otro archivo, el log se escribe en otra ruta.' }
      ]
    },
    {
      id: 'metodo-log',
      title: 'Método guiado para leer un log de error como desarrollador',
      content: 'Este método lo puedes repetir siempre, da igual el lenguaje.',
      codeExamples: [
        { description: 'Paso 1: mira el final', code: 'tail -n 80 logs/app.log' },
        { description: 'Paso 2: si necesitas contexto, abre con less', code: 'less logs/app.log', output: 'Dentro busca: /ERROR o "Exception"' },
        { description: 'Paso 3: identifica la línea que importa', code: '', output: 'Normalmente hay mucho ruido, ignora INFO si buscas un fallo. Quédate con: Tipo de error, Archivo o módulo implicado, Línea o ruta, Causa raíz si existe' },
        { description: 'Paso 4: captura evidencia bien', code: 'cat -n logs/app.log | grep ERROR', output: 'No reescribas el error a mano. Copia el fragmento o usa cat -n para referenciar línea.' }
      ]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Preparar entorno', instructions: 'Crea la estructura', commands: ['mkdir -p ~/workspace/visualizacion_practica/logs', 'cd ~/workspace/visualizacion_practica'] },
    { step: 2, title: 'Crear un log de ejemplo', instructions: 'Genera datos de prueba', commands: ['printf "INFO arrancando\\nINFO cargando config\\nWARN config incompleta\\nERROR fallo de conexion a DB\\nINFO reintentando\\nERROR timeout\\nINFO fin\\n" > logs/app.log'] },
    { step: 3, title: 'Ver el archivo con cat y cat -n', instructions: 'Visualiza el contenido', commands: ['cat logs/app.log', 'cat -n logs/app.log'] },
    { step: 4, title: 'Ver inicio y final', instructions: 'Usa head y tail', commands: ['head -n 3 logs/app.log', 'tail -n 3 logs/app.log'] },
    { step: 5, title: 'Abrir con less y buscar errores', instructions: 'Navega y busca', commands: ['less logs/app.log', '# Dentro de less:', '#/ERROR', '# n para siguiente', '# q para salir'] },
    { step: 6, title: 'Simular que el log crece y seguirlo', instructions: 'Usa tail -f', commands: ['# En una terminal:', 'tail -f logs/app.log', '# En otra terminal:', 'printf "INFO nuevo intento\\nERROR credenciales invalidas\\n" >> logs/app.log', '# Vuelve a la terminal del tail -f y comprueba que aparecen', '# Sal con Ctrl+c'] },
    { step: 7, title: 'Mini reto', instructions: 'Encuentra errores con números de línea', commands: ['cat -n logs/app.log | grep ERROR'] }
  ],
  commonErrors: [
    { error: 'less no me deja escribir', cause: 'Estás en less, no en un editor', solution: 'Sal con q', diagnosticCommand: 'q' },
    { error: 'tail -f se queda abierto', cause: 'Es su funcionamiento', solution: 'Ctrl+c', diagnosticCommand: 'Ctrl+c' },
    { error: 'cat no muestra nada', cause: 'Puede ser que el archivo esté vacío o estás en otra ruta', solution: 'pwd, ls, comprueba tamaño con ls -l', diagnosticCommand: 'pwd && ls -l' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Explica cuándo usar cat y cuándo usar less', answer: 'cat: archivos pequeños. less: archivos grandes que necesitas navegar.' },
    { id: 2, question: 'Muestra las 5 primeras líneas de un archivo y las 5 últimas', answer: 'head -n 5 archivo && tail -n 5 archivo' },
    { id: 3, question: 'Abre un archivo con less y busca una palabra dentro', answer: 'less archivo, /palabra, n para siguiente' },
    { id: 4, question: 'Usa tail -f para seguir un log y detente con Ctrl+c', answer: 'tail -f log.txt # luego Ctrl+c' },
    { id: 5, question: 'Extrae un error con su número de línea usando cat -n', answer: 'cat -n log.txt | grep ERROR' }
  ]
};

// MODULE 7: Redireccionamiento y tuberías
const module7: Module = {
  id: 'redireccionamiento',
  number: 7,
  title: 'Redireccionamiento y tuberías',
  objective: 'Entender cómo entra y sale la información de los comandos. Guardar salidas en archivos, sin copiar y pegar a mano. Separar resultados normales de errores, para diagnosticar mejor. Encadenar comandos para filtrar, resumir y encontrar lo importante en logs y listados.',
  description: 'stdin, stdout, stderr, operadores > >> 2>, pipes |, grep, tee.',
  labTime: '60-75 min',
  evalTime: '10-15 min',
  tags: ['Práctica 60-75 min', 'Errores típicos', 'Mini evaluación 10-15 min'],
  keyCommands: ['>', '>>', '2>', '2>>', '<', '2>&1', '|', 'tee', 'grep', 'wc -l'],
  sections: [
    {
      id: 'conceptos-es',
      title: 'Conceptos base: stdin, stdout, stderr',
      content: 'stdin (entrada estándar): Es lo que el programa lee. stdout (salida estándar): Es la salida normal del programa. stderr (error estándar): Es la salida de errores, mensajes de fallo o advertencias.',
      tips: [{ type: 'nota', content: 'Un comando puede escribir por stdout y por stderr a la vez, por eso a veces ves "mezclado" en pantalla.' }]
    },
    {
      id: 'operadores',
      title: 'Operadores de redirección más usados',
      content: 'Redirigir entrada y salida.',
      codeExamples: [
        { description: '> - Redirige stdout a un fichero, sobrescribe', code: 'ls -lah > listado.txt' },
        { description: '>> - Redirige stdout a un fichero, añade al final', code: 'echo "Segunda pasada" >> listado.txt' },
        { description: '2> - Redirige stderr a un fichero, sobrescribe', code: 'ls /carpeta_que_no_existe 2> errores.txt' },
        { description: '2>> - Redirige stderr a un fichero, añade', code: 'comando 2>> errores.log' },
        { description: '< - Usa un fichero como entrada', code: 'wc -l < todo.txt' },
        { description: '2>&1 - Mezcla stderr dentro de stdout', code: 'comando > todo.txt 2>&1' }
      ],
      tips: [{ type: 'nota', content: 'Siempre que veas un 2 delante, habla de errores, stderr.' }]
    },
    {
      id: 'tee',
      title: 'tee, ver en pantalla y guardar a la vez',
      content: 'tee es muy útil para evidencias de prácticas, porque ves la salida y a la vez la guardas.',
      codeExamples: [
        { description: 'Guardar sobrescribiendo', code: 'ls -lah | tee listado_tee.txt' },
        { description: 'Guardar añadiendo', code: 'ls -lt | tee -a listado_tee.txt' }
      ]
    },
    {
      id: 'tuberias',
      title: 'Tuberías, el operador |',
      content: 'Una tubería manda la salida de un comando como entrada del siguiente. Esto te permite construir "cadenas" para filtrar y quedarte con lo importante.',
      codeExamples: [
        { description: 'Esquema mental', code: 'comando1 | comando2 | comando3', output: 'Lo que produce el 1 lo procesa el 2, y lo que produce el 2 lo procesa el 3' },
        { description: 'Ver solo las primeras líneas de una salida larga', code: 'ls -lah /etc | head' },
        { description: 'Ver solo el final', code: 'ls -lah /etc | tail' },
        { description: 'Buscar líneas que contengan una palabra', code: 'cat logs/app.log | grep ERROR' },
        { description: 'Contar cuántas líneas cumplen algo', code: 'cat logs/app.log | grep ERROR | wc -l' },
        { description: 'Ordenar y eliminar duplicados', code: 'cat lista.txt | sort | uniq' }
      ]
    },
    {
      id: 'grep',
      title: 'grep, filtrado básico para logs',
      content: 'Busca líneas que contengan el patrón.',
      codeExamples: [
        { description: 'Busca líneas con el patrón', code: 'grep PATRON archivo' },
        { description: 'Busca ERROR en logs', code: 'grep ERROR logs/app.log' },
        { description: 'Muestra número de línea', code: 'grep -n ERROR logs/app.log' },
        { description: 'Ignora mayúsculas y minúsculas', code: 'grep -i error logs/app.log' },
        { description: 'Devuelve todo menos las líneas que contengan INFO', code: 'grep -v INFO logs/app.log' }
      ],
      tips: [{ type: 'consejo', content: 'En logs reales, primero filtra por ERROR, FAIL, EXCEPTION, WARN, y ya luego amplias.' }]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Preparar estructura', instructions: 'Crea carpetas de práctica', commands: ['mkdir -p ~/workspace/redireccion_practica/logs', 'cd ~/workspace/redireccion_practica'] },
    { step: 2, title: 'Crear un log de ejemplo', instructions: 'Genera datos de prueba', commands: ['printf "INFO inicio\\nINFO cargando\\nWARN config incompleta\\nERROR fallo de conexion\\nINFO reintentando\\nERROR timeout\\nINFO fin\\n" > logs/app.log'] },
    { step: 3, title: 'Redireccionar salida normal', instructions: 'Guarda salida en archivo', commands: ['ls -lah logs > evidencia_ls.txt', 'cat evidencia_ls.txt'] },
    { step: 4, title: 'Provocar un error y capturarlo', instructions: 'Captura solo stderr', commands: ['ls /carpeta_que_no_existe 2> evidencia_error.txt', 'cat evidencia_error.txt'] },
    { step: 5, title: 'Capturar todo junto', instructions: 'stdout y stderr juntos', commands: ['ls -lah logs /carpeta_que_no_existe > evidencia_todo.txt 2>&1', 'less evidencia_todo.txt'] },
    { step: 6, title: 'Filtrar errores del log y guardarlos', instructions: 'Usa grep y redirección', commands: ['cat logs/app.log | grep ERROR > errores.txt', 'cat errores.txt'] },
    { step: 7, title: 'Contar errores', instructions: 'Combina pipe con wc', commands: ['cat logs/app.log | grep ERROR | wc -l > cuenta_errores.txt', 'cat cuenta_errores.txt'] },
    { step: 8, title: 'Usar tee para evidencia visible', instructions: 'Muestra y guarda a la vez', commands: ['cat logs/app.log | grep -n ERROR | tee evidencia_errores_numerados.txt'] }
  ],
  commonErrors: [
    { error: 'He sobrescrito un archivo sin querer', cause: 'Has usado > en vez de >>', solution: 'Si era importante, intenta recuperar desde copia, y acostúmbrate a nombrar evidencias con fecha o sufijo', diagnosticCommand: 'ls -l' },
    { error: 'grep no encuentra nada', cause: 'El patrón no coincide, o hay mayúsculas, o estás mirando otro archivo', solution: 'Revisa ruta con pwd, comprueba contenido con less, prueba grep -i', diagnosticCommand: 'pwd && less archivo' },
    { error: 'wc da un número raro', cause: 'Estás contando palabras o caracteres en vez de líneas', solution: 'Usa wc -l', diagnosticCommand: 'wc -l archivo' },
    { error: 'No se crea el fichero de salida', cause: 'A veces es por permisos o porque no existe la ruta', solution: 'Revisa con ls y pwd, y si la carpeta no existe créala con mkdir -p', diagnosticCommand: 'pwd && ls -l' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Explica la diferencia entre stdout y stderr con un ejemplo', answer: 'stdout: salida normal. stderr: errores. Ejemplo: comando > salida.txt 2> errores.txt' },
    { id: 2, question: 'Ejecuta un comando que falle y guarda solo el error en un fichero', answer: 'ls /noexiste 2> error.txt' },
    { id: 3, question: 'Guarda en un fichero la salida normal y en otro los errores del mismo comando', answer: 'comando > salida.txt 2> errores.txt' },
    { id: 4, question: 'Filtra un log para quedarte solo con líneas que contengan ERROR y guárdalas', answer: 'cat log.txt | grep ERROR > errores.txt' },
    { id: 5, question: 'Cuenta cuántas líneas ERROR hay en el log usando tuberías y wc -l', answer: 'cat log.txt | grep ERROR | wc -l' }
  ]
};

// MODULE 8: Gestión de seguridad
const module8: Module = {
  id: 'seguridad',
  number: 8,
  title: 'Gestión de seguridad',
  objective: 'Entender quién eres en el sistema y qué puedes hacer. Aprender a crear y gestionar usuarios y grupos en un entorno controlado. Asignar permisos correctos a carpetas y ficheros sin recurrir a chapuzas. Evitar el clásico "chmod 777" y saber arreglar un "Permission denied" con criterio.',
  description: 'Usuarios, grupos, permisos rwx, chmod, chown, umask.',
  labTime: '60-90 min',
  evalTime: '10-15 min',
  tags: ['Práctica 60-90 min', 'Errores típicos', 'Mini evaluación 10-15 min'],
  keyCommands: ['whoami', 'id', 'groups', 'sudo', 'su', 'adduser', 'useradd', 'usermod', 'passwd', 'userdel', 'groupadd', 'usermod -aG', 'groupdel', 'chmod', 'chown', 'chgrp', 'umask'],
  sections: [
    {
      id: 'identidad',
      title: 'Identidad y contexto',
      content: 'Comandos básicos para saber quién eres.',
      codeExamples: [
        { description: 'Te dice el usuario actual', code: 'whoami' },
        { description: 'Te dice UID, GID y grupos a los que perteneces', code: 'id' },
        { description: 'Te lista los grupos del usuario actual', code: 'groups' },
        { description: '¿Soy root?', code: 'whoami', output: 'Si devuelve root, mucho cuidado' }
      ],
      tips: [{ type: 'nota', content: 'En muchos sistemas, lo normal es ser usuario y usar sudo puntualmente.' }]
    },
    {
      id: 'sudo-su',
      title: 'sudo y su, diferencia práctica',
      content: 'sudo ejecuta un comando como root, pero solo ese comando. su cambia de usuario, si no dices nada intenta pasar a root.',
      codeExamples: [
        { description: 'Ejecuta como root solo este comando', code: 'sudo ls /root' },
        { description: 'Actualizar paquetes', code: 'sudo apt update' }
      ],
      tips: [
        { type: 'consejo', content: 'Usa sudo solo cuando haga falta. Si no sabes por qué lo necesitas, para y revisa permisos antes.' },
        { type: 'nota', content: 'En sistemas actuales suele estar desaconsejado su para alumnado, mejor sudo.' }
      ]
    },
    {
      id: 'usuarios',
      title: 'Crear usuarios, modificar y eliminar',
      content: 'Según la distribución puede variar, lo típico en entornos Debian/Ubuntu es usar adduser.',
      codeExamples: [
        { description: 'Crea usuario y guía para contraseña y datos', code: 'sudo adduser nombreusuario' },
        { description: 'Más "bajo nivel", -m crea home, -s define shell', code: 'sudo useradd -m -s /bin/bash nombreusuario' },
        { description: 'Asignar o cambiar contraseña', code: 'sudo passwd nombreusuario' },
        { description: 'Bloquear una cuenta', code: 'sudo usermod -L nombreusuario' },
        { description: 'Desbloquear una cuenta', code: 'sudo usermod -U nombreusuario' },
        { description: 'Eliminar usuario', code: 'sudo userdel nombreusuario' },
        { description: 'Eliminar usuario y su home', code: 'sudo userdel -r nombreusuario' },
        { description: 'Ver información del usuario', code: 'getent passwd nombreusuario' }
      ],
      tips: [{ type: 'consejo', content: 'Caso real para dev: Crear un usuario "de servicio" o "deploy" para ejecutar una app con permisos mínimos. La idea es que la app no corra como root, sino con un usuario limitado.' }]
    },
    {
      id: 'grupos',
      title: 'Administración de grupos',
      content: 'Un grupo permite compartir permisos sin tener que andar cambiando propietario cada dos por tres.',
      codeExamples: [
        { description: 'Ver grupos del usuario', code: 'groups' },
        { description: 'Otra forma', code: 'id' },
        { description: 'Crear un grupo', code: 'sudo groupadd devs' },
        { description: 'Añadir usuario a un grupo (-a añade, no sustituye; -G indica lista de grupos secundarios)', code: 'sudo usermod -aG devs nombreusuario' },
        { description: 'Confirmar pertenencia', code: 'id nombreusuario' },
        { description: 'Eliminar un grupo', code: 'sudo groupdel devs' }
      ],
      tips: [{ type: 'consejo', content: 'Caso real para dev: Carpeta compartida de proyecto para un equipo. Grupo devs, carpeta /srv/proyecto. Todo el grupo puede escribir, nadie fuera del grupo puede tocarla.' }]
    },
    {
      id: 'permisos',
      title: 'Lectura rápida de permisos rwx',
      content: 'Cuando haces ls -l ves algo como: -rwxr-x---. Se divide en tres bloques: Propietario, grupo, otros.',
      codeExamples: [
        { description: 'r - lectura', code: 'ls -l', output: 'Permite leer el archivo' },
        { description: 'w - escritura', code: 'ls -l', output: 'Permite modificar el archivo' },
        { description: 'x - ejecución o "entrar" en un directorio', code: 'ls -l', output: 'Permite ejecutar el archivo o entrar en el directorio' }
      ],
      tips: [{ type: 'nota', content: 'En directorios, la x significa poder entrar y recorrer la carpeta. Por eso a veces puedes ver una carpeta pero no entrar, o al revés.' }]
    },
    {
      id: 'chmod',
      title: 'chmod, cambiar permisos',
      content: 'Forma simbólica (más clara) y forma numérica.',
      codeExamples: [
        { description: 'Añade ejecución al propietario', code: 'chmod u+x script.sh' },
        { description: 'Añade escritura al grupo', code: 'chmod g+w carpeta' },
        { description: 'Quita lectura a otros', code: 'chmod o-r archivo.txt' },
        { description: 'Numérica: 7=rwx, 6=rw-, 5=r-x, 4=r--, 0=---', code: '' },
        { description: 'Propietario lee y escribe, grupo y otros solo leen', code: 'chmod 644 archivo.txt' },
        { description: 'Propietario todo, grupo y otros leen y ejecutan', code: 'chmod 755 script.sh' }
      ],
      tips: [{ type: 'consejo', content: 'Caso real para dev: Haces un script de arranque y te falla con "Permission denied". Solución: chmod +x run.sh && ./run.sh' }]
    },
    {
      id: 'chown-chgrp',
      title: 'chown y chgrp, propietario y grupo',
      content: 'Cambiar propietario y grupo de archivos.',
      codeExamples: [
        { description: 'Cambiar propietario y grupo', code: 'sudo chown usuario:grupo fichero' },
        { description: 'Cambiar solo propietario', code: 'sudo chown usuario fichero' },
        { description: 'Cambiar solo grupo', code: 'sudo chgrp grupo fichero' },
        { description: 'Cambiar recursivo en carpetas', code: 'sudo chown -R usuario:grupo carpeta' }
      ],
      tips: [{ type: 'consejo', content: 'Caso real para dev: Has copiado un proyecto con sudo y ahora tu usuario no puede modificar archivos. Probable arreglo: sudo chown -R tuusuario:tugrupo carpeta_proyecto' }]
    },
    {
      id: 'umask',
      title: 'Umask, permisos por defecto',
      content: 'Umask define qué permisos se quitan por defecto al crear archivos y carpetas.',
      codeExamples: [
        { description: 'Ver umask', code: 'umask' }
      ],
      tips: [{ type: 'nota', content: 'Si hay una umask demasiado restrictiva, te salen archivos que nadie puede compartir. Si es demasiado permisiva, puede ser inseguro.' }]
    },
    {
      id: 'carpeta-compartida',
      title: 'Carpeta compartida bien hecha, sin 777',
      content: 'Receta típica para que un equipo pueda escribir en una carpeta común usando un grupo.',
      codeExamples: [
        { description: 'Paso 1: Crear carpeta', code: 'sudo mkdir -p /srv/proyecto' },
        { description: 'Paso 2: Asignar grupo devs', code: 'sudo chgrp devs /srv/proyecto' },
        { description: 'Paso 3: Permisos para que el grupo escriba', code: 'sudo chmod 2775 /srv/proyecto' }
      ],
      tips: [
        { type: 'nota', content: 'Qué significa 2775: 2 activa el bit setgid en directorios. Esto hace que los archivos nuevos hereden el grupo de la carpeta, evita el caos de grupos mezclados.' },
        { type: 'ojo', content: 'Nota de seguridad: Todo lo que implique crear usuarios o cambiar permisos de sistema se hace en una VM o entorno de prácticas, nunca en tu máquina personal sin saber qué estás tocando.' }
      ]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Comprobar tu identidad', instructions: 'Verifica quién eres', commands: ['whoami', 'id'] },
    { step: 2, title: 'Crear grupo devs', instructions: 'Crea el grupo de desarrollo', commands: ['sudo groupadd devs'] },
    { step: 3, title: 'Crear dos usuarios de prácticas', instructions: 'Crea usuarios de prueba', commands: ['sudo adduser alumno1', 'sudo adduser alumno2'] },
    { step: 4, title: 'Añadirlos al grupo devs', instructions: 'Asigna usuarios al grupo', commands: ['sudo usermod -aG devs alumno1', 'sudo usermod -aG devs alumno2', 'id alumno1', 'id alumno2'] },
    { step: 5, title: 'Crear carpeta compartida', instructions: 'Configura carpeta compartida', commands: ['sudo mkdir -p /srv/proyecto', 'sudo chgrp devs /srv/proyecto', 'sudo chmod 2775 /srv/proyecto', 'ls -ld /srv/proyecto'] },
    { step: 6, title: 'Probar escritura como alumno1', instructions: 'Test con primer usuario', commands: ['su - alumno1', 'cd /srv/proyecto', 'touch prueba_alumno1.txt', 'ls -l', 'exit'] },
    { step: 7, title: 'Probar escritura como alumno2', instructions: 'Test con segundo usuario', commands: ['su - alumno2', 'cd /srv/proyecto', 'echo "hola" > prueba_alumno2.txt', 'ls -l', 'exit'] },
    { step: 8, title: 'Comprobar que el grupo se hereda', instructions: 'Verifica setgid', commands: ['ls -l /srv/proyecto', '# Si el grupo no se hereda, revisa que el directorio tiene el bit setgid:', 'ls -ld /srv/proyecto'] }
  ],
  commonErrors: [
    { error: 'usermod: group devs does not exist', cause: 'El grupo no se creó o lo escribiste mal', solution: 'Crea el grupo y repite usermod', diagnosticCommand: 'sudo groupadd devs' },
    { error: 'Permission denied al escribir en /srv/proyecto', cause: 'Falta permiso de escritura al grupo o no eres miembro del grupo', solution: 'Revisa chmod y pertenencia al grupo', diagnosticCommand: 'id usuario && ls -ld /srv/proyecto' },
    { error: 'He añadido al grupo pero no funciona', cause: 'A veces la sesión no refresca los grupos', solution: 'Cierra sesión y entra de nuevo, o usa su - usuario', diagnosticCommand: 'su - usuario' },
    { error: 'He tocado permisos y ahora nadie puede entrar', cause: 'Te has cargado la x en un directorio, sin x no se puede entrar', solution: 'Revisa con ls -ld y corrige con chmod, por ejemplo chmod 755 o chmod 775 según caso', diagnosticCommand: 'ls -ld carpeta' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Muestra tu usuario y tus grupos con whoami e id', answer: 'whoami && id' },
    { id: 2, question: 'Crea un grupo devs2 y añade un usuario a ese grupo', answer: 'sudo groupadd devs2 && sudo usermod -aG devs2 usuario' },
    { id: 3, question: 'Crea una carpeta compartida para ese grupo con permisos de escritura', answer: 'sudo mkdir /srv/proyecto2 && sudo chgrp devs2 /srv/proyecto2 && sudo chmod 2775 /srv/proyecto2' },
    { id: 4, question: 'Explica por qué chmod 777 es mala idea en un entorno real', answer: 'Da permisos totales a todos, incluyendo usuarios no autorizados. Es un riesgo de seguridad.' },
    { id: 5, question: 'Explica qué hace el bit setgid en un directorio y por qué ayuda en trabajo en equipo', answer: 'Hace que los archivos nuevos hereden el grupo del directorio. Evita que cada usuario cree archivos con su grupo principal.' }
  ]
};

// MODULE 9: Otras tareas administrativas
const module9: Module = {
  id: 'admin-tareas',
  number: 9,
  title: 'Otras tareas administrativas',
  objective: 'Tener un kit básico para diagnosticar problemas comunes en Linux. Saber mirar recursos, procesos, espacio en disco y red sin herramientas gráficas. Hacer tareas habituales de mantenimiento en un entorno de prácticas. Preparar evidencias de que has revisado algo, esto en clase viene muy bien.',
  description: 'Hardware, procesos, comprimir, cron, montar, variables, apt.',
  labTime: '90 min',
  evalTime: '15 min',
  tags: ['Práctica 90 min', 'Errores típicos', 'Mini evaluación 15 min'],
  keyCommands: ['lscpu', 'free', 'uptime', 'df', 'lsblk', 'du', 'ip', 'ping', 'ps', 'top', 'kill', 'tar', 'zip', 'cron', 'mount', 'findmnt', 'env', 'export', 'unset', 'apt'],
  sections: [
    {
      id: 'hardware',
      title: 'Consultar hardware y estado del sistema',
      content: 'Diagnóstico básico del sistema.',
      codeExamples: [
        { description: 'Información de CPU, arquitectura, núcleos', code: 'lscpu' },
        { description: 'Memoria RAM y swap en formato legible', code: 'free -h' },
        { description: 'Tiempo encendido y carga media', code: 'uptime' },
        { description: 'Espacio libre por sistema de ficheros', code: 'df -h' },
        { description: 'Lista discos y particiones', code: 'lsblk' },
        { description: 'Tamaño total de una carpeta', code: 'du -sh carpeta' },
        { description: 'Tamaño de cada elemento en la carpeta actual', code: 'du -sh *' }
      ],
      tips: [{ type: 'consejo', content: 'Caso real de clase: "No puedo instalar nada, me falla apt". Muchas veces es falta de espacio en disco. Primero miras df -h, luego buscas qué carpeta pesa con du.' }]
    },
    {
      id: 'red',
      title: 'Red básica, ver IP y conectividad',
      content: 'Comandos de red esenciales.',
      codeExamples: [
        { description: 'Muestra interfaces y direcciones IP', code: 'ip a' },
        { description: 'Muestra rutas', code: 'ip r' },
        { description: 'Prueba conectividad, 4 paquetes', code: 'ping -c 4 8.8.8.8' },
        { description: 'Si IP funciona pero nombre no, puede ser DNS', code: 'ping -c 4 google.com' }
      ],
      tips: [{ type: 'consejo', content: 'Caso real: "Tengo Internet pero no resuelvo dominios". Pruebas ping a IP y ping a dominio.' }]
    },
    {
      id: 'procesos',
      title: 'Gestión de procesos',
      content: 'Ver y controlar procesos.',
      codeExamples: [
        { description: 'Lista procesos con usuario y consumo', code: 'ps aux' },
        { description: 'Vista en tiempo real', code: 'top' },
        { description: 'Más cómodo que top (si está instalado)', code: 'htop' },
        { description: 'Envía señal de terminar', code: 'kill PID' },
        { description: 'Fuerza cierre, última opción', code: 'kill -9 PID' },
        { description: 'Mata procesos por nombre, cuidado', code: 'pkill nombre' }
      ],
      tips: [
        { type: 'consejo', content: 'Caso dev típico: Un proceso se queda colgado o consume CPU al 100%. Usas top, identificas PID y actúas.' },
        { type: 'ojo', content: 'Error típico: Matas el proceso equivocado. Solución: Revisar bien el comando completo en ps, no mates por intuición.' }
      ]
    },
    {
      id: 'segundo-plano',
      title: 'Trabajos en segundo plano',
      content: 'Gestionar procesos en background.',
      codeExamples: [
        { description: 'Lanza en segundo plano', code: 'comando &' },
        { description: 'Lista trabajos de la shell actual', code: 'jobs' },
        { description: 'Trae un trabajo al primer plano', code: 'fg' },
        { description: 'Continúa un trabajo en segundo plano', code: 'bg' },
        { description: 'Ejemplo simple', code: 'sleep 60 &\njobs\nfg' }
      ]
    },
    {
      id: 'comprimir',
      title: 'Comprimir y empaquetar ficheros',
      content: 'tar y zip para empaquetar.',
      codeExamples: [
        { description: 'Crear un tar', code: 'tar -cvf entrega.tar carpeta' },
        { description: 'Extraer tar', code: 'tar -xvf entrega.tar' },
        { description: 'Crear con compresión gzip', code: 'tar -czvf entrega.tar.gz carpeta' },
        { description: 'Extraer gzip', code: 'tar -xzvf entrega.tar.gz' },
        { description: 'Crear zip', code: 'zip -r entrega.zip carpeta' },
        { description: 'Extraer zip', code: 'unzip entrega.zip' }
      ],
      tips: [
        { type: 'consejo', content: 'Caso de desarrollo: Entregar proyecto o evidencias, tar.gz es formato típico en Linux.' },
        { type: 'consejo', content: 'Caso típico: Subir entregas a plataforma que espera zip.' }
      ]
    },
    {
      id: 'cron',
      title: 'Programar tareas, cron',
      content: 'Un planificador de tareas, ejecuta comandos a horas concretas. Útil para backups, limpiezas, recordatorios técnicos.',
      codeExamples: [
        { description: 'Editar crontab del usuario', code: 'crontab -e' },
        { description: 'Ver crontab', code: 'crontab -l' },
        { description: 'Formato: minuto hora día_mes mes día_semana comando', code: '' },
        { description: 'Ejemplo: cada día a las 20:00', code: '0 20 * * * echo "backup" >> ~/workspace/cron_log.txt' },
        { description: 'Ejemplo: cada 5 minutos', code: '*/5 * * * * date >> ~/workspace/cron_log.txt' }
      ],
      tips: [{ type: 'ojo', content: 'En cron no siempre tienes el mismo PATH que en tu terminal. Si un comando no funciona en cron, prueba a poner ruta absoluta, por ejemplo /usr/bin/python' }]
    },
    {
      id: 'montar',
      title: 'Montar y desmontar un sistema de ficheros',
      content: 'Montar es hacer que un dispositivo o partición aparezca en una carpeta del sistema.',
      codeExamples: [
        { description: 'Ver montajes actuales', code: 'mount' },
        { description: 'Más directo', code: 'findmnt' },
        { description: 'Montar manualmente', code: 'sudo mount /dev/sdb1 /mnt' },
        { description: 'Desmontar', code: 'sudo umount /mnt' }
      ],
      tips: [{ type: 'consejo', content: 'Caso típico de clase: "No puedo sacar el USB, dice que está en uso". Primero sales de la carpeta, cierras ficheros y haces umount.' }]
    },
    {
      id: 'variables',
      title: 'Variables de entorno',
      content: 'Variables que afectan a cómo se ejecutan programas, configuración sin hardcode. Muy usadas en desarrollo para entornos, rutas, claves, puertos.',
      codeExamples: [
        { description: 'Ver variables', code: 'env' },
        { description: 'Ver una variable concreta', code: 'echo "$HOME"' },
        { description: 'Ver PATH', code: 'echo "$PATH"' },
        { description: 'Crear variable para la sesión actual', code: 'export APP_ENV=dev' },
        { description: 'Verificar', code: 'echo "$APP_ENV"' },
        { description: 'Eliminar variable de la sesión', code: 'unset APP_ENV' },
        { description: 'Ejecutar con una configuración diferente', code: 'APP_ENV=prod comando' }
      ]
    },
    {
      id: 'apt',
      title: 'Gestión de paquetes, apt',
      content: 'En distribuciones Debian/Ubuntu, apt es lo normal.',
      codeExamples: [
        { description: 'Actualizar lista de paquetes', code: 'sudo apt update' },
        { description: 'Actualizar paquetes instalados', code: 'sudo apt upgrade' },
        { description: 'Instalar paquete', code: 'sudo apt install nombre_paquete' },
        { description: 'Desinstalar', code: 'sudo apt remove nombre_paquete' },
        { description: 'Desinstalar con configuración', code: 'sudo apt purge nombre_paquete' },
        { description: 'Buscar paquete', code: 'apt search nombre' },
        { description: 'Ver info', code: 'apt show nombre_paquete' }
      ],
      tips: [{ type: 'consejo', content: 'Caso real: Te falta una herramienta, no inventes. apt search, apt show, apt install.' }]
    }
  ],
  guidedPractice: [
    { step: 1, title: 'Crear carpeta de evidencias', instructions: 'Prepara estructura', commands: ['mkdir -p ~/workspace/admin_practica/evidencias', 'cd ~/workspace/admin_practica'] },
    { step: 2, title: 'Capturar info del sistema', instructions: 'Guarda información del sistema', commands: ['uptime > evidencias/uptime.txt', 'free -h > evidencias/memoria.txt', 'df -h > evidencias/disco.txt', 'ip a > evidencias/red_ip.txt', 'less evidencias/disco.txt'] },
    { step: 3, title: 'Procesos', instructions: 'Captura procesos', commands: ['ps aux > evidencias/procesos.txt', 'top', '# Sal con q'] },
    { step: 4, title: 'Empaquetar evidencias', instructions: 'Crea tar.gz', commands: ['tar -czvf evidencias_admin.tar.gz evidencias', 'tar -tzvf evidencias_admin.tar.gz | head'] },
    { step: 5, title: 'Cron, registro de prueba', instructions: 'Configura tarea programada', commands: ['crontab -e', '# Añade esta línea:', '*/5 * * * * date >> ~/workspace/admin_practica/cron_log.txt', '# Esperar 6 minutos y comprobar:', 'tail -n 5 ~/workspace/admin_practica/cron_log.txt', '# Quitar la tarea de cron al acabar:', 'crontab -e # y eliminas la línea'] }
  ],
  commonErrors: [
    { error: 'apt update falla por falta de espacio', cause: 'Disco lleno', solution: 'Mira df -h y limpia, no intentes instalar a ciegas', diagnosticCommand: 'df -h' },
    { error: 'cron no ejecuta mi comando', cause: 'Puede ser por PATH o por permisos', solution: 'Usa rutas absolutas y prueba el comando manualmente', diagnosticCommand: 'which comando' },
    { error: 'umount dice que está ocupado', cause: 'Estás dentro de la carpeta montada o hay un proceso usando archivos', solution: 'Sal de la ruta y cierra programas, luego reintenta', diagnosticCommand: 'cd ~' },
    { error: 'kill no funciona', cause: 'Puede que no tengas permisos o el PID cambió', solution: 'Confirma PID con ps, si no hay permisos, no fuerces sin entender', diagnosticCommand: 'ps aux | grep proceso' }
  ],
  miniEvaluation: [
    { id: 1, question: 'Saca un informe de memoria y disco con free -h y df -h', answer: 'free -h && df -h' },
    { id: 2, question: 'Encuentra un proceso por nombre con ps y explica qué hace', answer: 'ps aux | grep nombre' },
    { id: 3, question: 'Crea un tar.gz con evidencias y demuestra que sabes listar su contenido', answer: 'tar -czvf backup.tar.gz carpeta && tar -tzvf backup.tar.gz' },
    { id: 4, question: 'Crea una tarea cron que escriba la fecha en un archivo y comprueba que funciona', answer: 'crontab -e, añade: */5 * * * * date >> ~/cron.txt' },
    { id: 5, question: 'Explica la diferencia entre apt update y apt upgrade', answer: 'update: actualiza la lista de paquetes. upgrade: actualiza los paquetes instalados.' }
  ]
};

// Export all modules
export const modules: Module[] = [module1, module2, module3, module4, module5, module6, module7, module8, module9];

// Commands reference data - Extended with all commands from PDFs
export const commands: Command[] = [
  // ===== ORIENTACIÓN Y CONTEXTO =====
  { name: 'pwd', category: 'Orientación', description: 'Muestra la ruta actual (print working directory)', syntax: 'pwd', options: [], examples: [{ command: 'pwd', explanation: 'Muestra /home/usuario/proyecto' }], moduleId: 'modo-comando' },
  { name: 'whoami', category: 'Orientación', description: 'Te dice el usuario actual', syntax: 'whoami', options: [], examples: [{ command: 'whoami', explanation: 'Muestra: usuario' }], moduleId: 'modo-comando' },
  { name: 'hostname', category: 'Orientación', description: 'Te dice el nombre del equipo', syntax: 'hostname', options: [], examples: [{ command: 'hostname', explanation: 'Muestra: mi-laptop' }], moduleId: 'modo-comando' },
  { name: 'id', category: 'Orientación', description: 'Te dice tus grupos y permisos', syntax: 'id', options: [], examples: [{ command: 'id', explanation: 'Muestra UID, GID y grupos' }], moduleId: 'modo-comando' },
  { name: 'groups', category: 'Orientación', description: 'Lista los grupos del usuario actual', syntax: 'groups', options: [], examples: [{ command: 'groups', explanation: 'Muestra: usuario adm cdrom sudo dip plugdev' }], moduleId: 'seguridad' },
  
  // ===== AYUDA Y DOCUMENTACIÓN =====
  { name: 'man', category: 'Ayuda', description: 'Manual oficial del comando', syntax: 'man comando', options: [{ flag: '-k', description: 'Busca por palabra clave' }], examples: [{ command: 'man ls', explanation: 'Abre el manual de ls. Dentro: /buscar, n siguiente, q salir' }], moduleId: 'modo-comando' },
  { name: 'help', category: 'Ayuda', description: 'Ayuda de comandos internos de la shell', syntax: 'help comando', options: [], examples: [{ command: 'help cd', explanation: 'Muestra ayuda del comando cd' }], moduleId: 'modo-comando' },
  { name: 'apropos', category: 'Ayuda', description: 'Busca comandos por palabra clave en manuales', syntax: 'apropos "palabra"', options: [], examples: [{ command: 'apropos "copy"', explanation: 'Lista comandos relacionados con copiar' }], moduleId: 'modo-comando' },
  { name: 'info', category: 'Ayuda', description: 'Documentación alternativa, a veces más completa', syntax: 'info comando', options: [], examples: [{ command: 'info coreutils', explanation: 'Muestra info de coreutils' }], moduleId: 'modo-comando' },
  
  // ===== HISTORIAL Y ALIAS =====
  { name: 'history', category: 'Historial', description: 'Muestra el historial de comandos', syntax: 'history', options: [], examples: [{ command: 'history', explanation: 'Muestra comandos anteriores numerados' }], moduleId: 'modo-comando' },
  { name: '!!', category: 'Historial', description: 'Repite el último comando', syntax: '!!', options: [], examples: [{ command: '!!', explanation: 'Ejecuta el último comando otra vez' }], moduleId: 'modo-comando' },
  { name: 'alias', category: 'Alias', description: 'Crea o muestra alias', syntax: 'alias nombre="comando"', options: [], examples: [{ command: 'alias ll="ls -lah"', explanation: 'Crea alias para listado largo' }, { command: 'alias', explanation: 'Muestra todos los alias' }, { command: 'unalias ll', explanation: 'Elimina el alias ll' }], moduleId: 'modo-comando' },
  
  // ===== NAVEGACIÓN =====
  { name: 'ls', category: 'Navegación', description: 'Lista el contenido del directorio', syntax: 'ls [opciones] [ruta]', options: [{ flag: '-l', description: 'Listado largo con permisos' }, { flag: '-a', description: 'Incluye archivos ocultos' }, { flag: '-h', description: 'Tamaños legibles' }, { flag: '-t', description: 'Ordena por fecha' }, { flag: '-S', description: 'Ordena por tamaño' }, { flag: '-d', description: 'Muestra directorios, no su contenido' }], examples: [{ command: 'ls -lah', explanation: 'Lista larga, ocultos, tamaños legibles' }, { command: 'ls -lt', explanation: 'Ordena por fecha, más reciente arriba' }, { command: 'ls -ad ~/.*', explanation: 'Muestra solo archivos ocultos del home' }], moduleId: 'comandos-basicos' },
  { name: 'cd', category: 'Navegación', description: 'Cambia de directorio', syntax: 'cd ruta', options: [], examples: [{ command: 'cd ~', explanation: 'Va al home' }, { command: 'cd ..', explanation: 'Sube un nivel' }, { command: 'cd -', explanation: 'Vuelve al directorio anterior' }, { command: 'cd /', explanation: 'Va a la raíz' }], moduleId: 'comandos-basicos' },
  { name: 'mkdir', category: 'Navegación', description: 'Crea directorios', syntax: 'mkdir [opciones] directorio', options: [{ flag: '-p', description: 'Crea padres si no existen' }, { flag: '-v', description: 'Muestra lo que va creando' }], examples: [{ command: 'mkdir -p ruta/larga/carpeta', explanation: 'Crea toda la ruta' }], moduleId: 'comandos-basicos' },
  { name: 'rmdir', category: 'Navegación', description: 'Elimina directorios vacíos', syntax: 'rmdir directorio', options: [], examples: [{ command: 'rmdir carpeta_vacia', explanation: 'Borra carpeta vacía' }], moduleId: 'comandos-basicos' },
  { name: 'rm', category: 'Navegación', description: 'Elimina archivos o directorios', syntax: 'rm [opciones] objetivo', options: [{ flag: '-r', description: 'Recursivo (para carpetas)' }, { flag: '-f', description: 'Forzar sin preguntar' }, { flag: '-v', description: 'Muestra lo que borra' }, { flag: '-i', description: 'Pide confirmación' }], examples: [{ command: 'rm -r carpeta', explanation: 'Borra carpeta y contenido' }, { command: 'rm -i archivo.txt', explanation: 'Pide confirmación antes de borrar' }], safetyNote: '¡Cuidado! rm -rf / destruiría el sistema', moduleId: 'comandos-basicos' },
  { name: 'cp', category: 'Navegación', description: 'Copia archivos o directorios', syntax: 'cp [opciones] origen destino', options: [{ flag: '-r', description: 'Recursivo para carpetas' }, { flag: '-v', description: 'Muestra lo que copia' }, { flag: '-i', description: 'Pide confirmación si existe' }], examples: [{ command: 'cp .env.example .env', explanation: 'Copia archivo de ejemplo' }, { command: 'cp -r dir1 dir2', explanation: 'Copia carpeta recursivamente' }], moduleId: 'comandos-basicos' },
  { name: 'mv', category: 'Navegación', description: 'Mueve o renombra', syntax: 'mv [opciones] origen destino', options: [{ flag: '-v', description: 'Muestra lo que mueve' }, { flag: '-i', description: 'Pide confirmación si existe' }], examples: [{ command: 'mv viejo.txt nuevo.txt', explanation: 'Renombra archivo' }, { command: 'mv archivo.txt carpeta/', explanation: 'Mueve archivo a carpeta' }], moduleId: 'comandos-basicos' },
  
  // ===== INFORMACIÓN DE ARCHIVOS =====
  { name: 'file', category: 'Información', description: 'Identifica el tipo de archivo', syntax: 'file archivo', options: [], examples: [{ command: 'file script.sh', explanation: 'Muestra: script.sh: Bourne-Again shell script' }], moduleId: 'comandos-basicos' },
  { name: 'stat', category: 'Información', description: 'Muestra metadatos detallados del archivo', syntax: 'stat archivo', options: [], examples: [{ command: 'stat archivo.txt', explanation: 'Muestra permisos, tamaño, fechas, inodo' }], moduleId: 'comandos-basicos' },
  { name: 'wc', category: 'Información', description: 'Cuenta líneas, palabras y bytes', syntax: 'wc [opciones] [archivo]', options: [{ flag: '-l', description: 'Solo líneas' }, { flag: '-w', description: 'Solo palabras' }, { flag: '-c', description: 'Solo bytes' }], examples: [{ command: 'wc -l archivo.txt', explanation: 'Cuenta líneas del archivo' }, { command: 'cat log.txt | grep ERROR | wc -l', explanation: 'Cuenta errores en el log' }], moduleId: 'comandos-basicos' },
  { name: 'diff', category: 'Información', description: 'Compara archivos línea a línea', syntax: 'diff [opciones] archivo1 archivo2', options: [{ flag: '-u', description: 'Formato unificado (más legible)' }], examples: [{ command: 'diff -u config.bak config', explanation: 'Muestra diferencias entre configs' }], moduleId: 'comandos-basicos' },
  { name: 'cmp', category: 'Información', description: 'Comparación binaria simple', syntax: 'cmp archivo1 archivo2', options: [], examples: [{ command: 'cmp archivo1 archivo2', explanation: 'Compara byte a byte' }], moduleId: 'comandos-basicos' },
  
  // ===== VISUALIZACIÓN =====
  { name: 'cat', category: 'Visualización', description: 'Muestra contenido completo de archivos', syntax: 'cat [opciones] archivo', options: [{ flag: '-n', description: 'Muestra números de línea' }, { flag: '-b', description: 'Números solo en líneas no vacías' }], examples: [{ command: 'cat -n archivo.txt', explanation: 'Muestra con números de línea' }, { command: 'cat archivo1 archivo2', explanation: 'Concatena archivos' }], moduleId: 'visualizacion' },
  { name: 'less', category: 'Visualización', description: 'Visor paginado para archivos grandes', syntax: 'less archivo', options: [], examples: [{ command: 'less log.txt', explanation: 'Abre visor. q salir, /buscar, n siguiente, b página atrás' }], moduleId: 'visualizacion' },
  { name: 'more', category: 'Visualización', description: 'Visor paginado simple', syntax: 'more archivo', options: [], examples: [{ command: 'more archivo.txt', explanation: 'Muestra página a página' }], moduleId: 'visualizacion' },
  { name: 'head', category: 'Visualización', description: 'Muestra las primeras líneas', syntax: 'head [opciones] archivo', options: [{ flag: '-n N', description: 'Muestra N líneas' }, { flag: '-c N', description: 'Muestra N bytes' }], examples: [{ command: 'head -n 20 archivo.txt', explanation: 'Muestra 20 primeras líneas' }, { command: 'head -n 1 datos.csv', explanation: 'Ver cabecera de CSV' }], moduleId: 'visualizacion' },
  { name: 'tail', category: 'Visualización', description: 'Muestra las últimas líneas', syntax: 'tail [opciones] archivo', options: [{ flag: '-n N', description: 'Muestra N líneas' }, { flag: '-f', description: 'Seguir en tiempo real' }, { flag: '-F', description: 'Seguir incluso si el archivo rota' }], examples: [{ command: 'tail -n 100 logs/app.log', explanation: 'Últimas 100 líneas del log' }, { command: 'tail -f app.log', explanation: 'Sigue el log en tiempo real. Ctrl+c para parar' }], moduleId: 'visualizacion' },
  { name: 'nl', category: 'Visualización', description: 'Muestra archivo con números de línea', syntax: 'nl archivo', options: [], examples: [{ command: 'nl archivo.txt', explanation: 'Muestra con números de línea' }], moduleId: 'visualizacion' },
  { name: 'tac', category: 'Visualización', description: 'Muestra líneas en orden inverso', syntax: 'tac archivo', options: [], examples: [{ command: 'tac archivo.txt', explanation: 'Muestra de última línea a primera' }], moduleId: 'visualizacion' },
  
  // ===== EDICIÓN =====
  { name: 'nano', category: 'Edición', description: 'Editor sencillo para cambios rápidos', syntax: 'nano archivo', options: [], examples: [{ command: 'nano config.txt', explanation: 'Ctrl+O guardar, Ctrl+X salir, Ctrl+W buscar, Ctrl+K cortar, Ctrl+U pegar' }], moduleId: 'editores' },
  { name: 'vim', category: 'Edición', description: 'Editor potente para servidores', syntax: 'vim archivo', options: [], examples: [{ command: 'vim archivo.txt', explanation: 'i insertar, Esc salir modo, :wq guardar y salir, :q! salir sin guardar, /buscar, n siguiente' }], moduleId: 'editores' },
  { name: 'touch', category: 'Edición', description: 'Crea archivo vacío o actualiza fecha', syntax: 'touch archivo', options: [], examples: [{ command: 'touch nuevo.txt', explanation: 'Crea archivo vacío' }, { command: 'touch logs/app.log', explanation: 'Crea archivo en subdirectorio' }], moduleId: 'comandos-basicos' },
  { name: 'printf', category: 'Edición', description: 'Imprime con formato', syntax: 'printf "formato" argumentos', options: [], examples: [{ command: 'printf "linea1\\nlinea2\\n" > archivo.txt', explanation: 'Escribe líneas en archivo' }], moduleId: 'comandos-basicos' },
  
  // ===== REDIRECCIÓN Y TUBERÍAS =====
  { name: '>', category: 'Redirección', description: 'Redirige stdout a archivo (sobrescribe)', syntax: 'comando > archivo', options: [], examples: [{ command: 'ls > listado.txt', explanation: 'Guarda salida de ls en archivo' }], moduleId: 'redireccionamiento' },
  { name: '>>', category: 'Redirección', description: 'Redirige stdout a archivo (añade)', syntax: 'comando >> archivo', options: [], examples: [{ command: 'echo "linea" >> archivo.txt', explanation: 'Añade línea al final' }], moduleId: 'redireccionamiento' },
  { name: '2>', category: 'Redirección', description: 'Redirige stderr a archivo', syntax: 'comando 2> archivo', options: [], examples: [{ command: 'ls /noexiste 2> error.txt', explanation: 'Guarda solo el error' }, { command: 'comando 2>> errores.log', explanation: 'Añade errores al log' }], moduleId: 'redireccionamiento' },
  { name: '<', category: 'Redirección', description: 'Usa archivo como entrada', syntax: 'comando < archivo', options: [], examples: [{ command: 'wc -l < todo.txt', explanation: 'Cuenta líneas de archivo como entrada' }], moduleId: 'redireccionamiento' },
  { name: '2>&1', category: 'Redirección', description: 'Mezcla stderr dentro de stdout', syntax: 'comando > archivo 2>&1', options: [], examples: [{ command: 'comando > todo.txt 2>&1', explanation: 'Guarda stdout y stderr juntos' }], moduleId: 'redireccionamiento' },
  { name: '|', category: 'Redirección', description: 'Tubería: pasa salida a siguiente comando', syntax: 'comando1 | comando2', options: [], examples: [{ command: 'cat log.txt | grep ERROR', explanation: 'Filtra líneas con ERROR' }, { command: 'ps aux | grep python', explanation: 'Busca procesos python' }, { command: 'ls -lah /etc | head', explanation: 'Primeras líneas del listado' }], moduleId: 'redireccionamiento' },
  { name: 'grep', category: 'Redirección', description: 'Filtra líneas que contienen patrón', syntax: 'grep [opciones] patrón [archivo]', options: [{ flag: '-i', description: 'Ignora mayúsculas/minúsculas' }, { flag: '-n', description: 'Muestra números de línea' }, { flag: '-v', description: 'Invierte (muestra lo que NO coincide)' }, { flag: '-r', description: 'Búsqueda recursiva' }, { flag: '-E', description: 'Expresiones regulares extendidas' }], examples: [{ command: 'grep -i error log.txt', explanation: 'Busca "error" sin distinguir mayúsculas' }, { command: 'grep -v INFO log.txt', explanation: 'Muestra todo menos líneas INFO' }, { command: 'grep -rn "TODO" proyecto/', explanation: 'Busca TODO recursivamente' }], moduleId: 'redireccionamiento' },
  { name: 'sort', category: 'Redirección', description: 'Ordena líneas de texto', syntax: 'sort [opciones] [archivo]', options: [{ flag: '-r', description: 'Orden inverso' }, { flag: '-n', description: 'Orden numérico' }, { flag: '-u', description: 'Elimina duplicados' }], examples: [{ command: 'cat lista.txt | sort', explanation: 'Ordena líneas alfabéticamente' }, { command: 'cat lista.txt | sort | uniq', explanation: 'Ordena y elimina duplicados' }], moduleId: 'redireccionamiento' },
  { name: 'uniq', category: 'Redirección', description: 'Elimina líneas duplicadas consecutivas', syntax: 'uniq [opciones] [archivo]', options: [{ flag: '-c', description: 'Cuenta ocurrencias' }, { flag: '-d', description: 'Muestra solo duplicados' }], examples: [{ command: 'cat lista.txt | sort | uniq', explanation: 'Elimina duplicados' }, { command: 'cat lista.txt | sort | uniq -c', explanation: 'Cuenta ocurrencias de cada línea' }], moduleId: 'redireccionamiento' },
  { name: 'cut', category: 'Redirección', description: 'Extrae secciones de cada línea', syntax: 'cut [opciones] [archivo]', options: [{ flag: '-d', description: 'Delimitador' }, { flag: '-f', description: 'Campos a extraer' }], examples: [{ command: 'cut -d"," -f1 archivo.csv', explanation: 'Extrae primera columna de CSV' }, { command: 'cut -d":" -f1 /etc/passwd', explanation: 'Extrae nombres de usuario' }], moduleId: 'redireccionamiento' },
  { name: 'tr', category: 'Redirección', description: 'Traduce o elimina caracteres', syntax: 'tr [opciones] conjunto1 [conjunto2]', options: [], examples: [{ command: 'echo "hola" | tr a-z A-Z', explanation: 'Convierte a mayúsculas' }, { command: 'cat archivo.txt | tr -d "\\n"', explanation: 'Elimina saltos de línea' }], moduleId: 'redireccionamiento' },
  { name: 'tee', category: 'Redirección', description: 'Muestra en pantalla y guarda a la vez', syntax: 'comando | tee archivo', options: [{ flag: '-a', description: 'Añade al final (append)' }], examples: [{ command: 'ls -la | tee listado.txt', explanation: 'Muestra y guarda listado' }, { command: 'ls -lt | tee -a listado.txt', explanation: 'Añade al archivo existente' }], moduleId: 'redireccionamiento' },
  
  // ===== SEGURIDAD =====
  { name: 'chmod', category: 'Seguridad', description: 'Cambia permisos de archivos', syntax: 'chmod [opciones] modo archivo', options: [{ flag: '-R', description: 'Recursivo' }, { flag: '-v', description: 'Muestra cambios' }], examples: [{ command: 'chmod +x script.sh', explanation: 'Hace ejecutable el script' }, { command: 'chmod 755 script.sh', explanation: 'rwxr-xr-x (propietario todo, grupo y otros leer/ejecutar)' }, { command: 'chmod 644 archivo.txt', explanation: 'rw-r--r-- (propietario leer/escribir, otros solo leer)' }, { command: 'chmod u+x,g+w archivo', explanation: 'Añade ejecución al usuario y escritura al grupo' }], moduleId: 'seguridad' },
  { name: 'chown', category: 'Seguridad', description: 'Cambia propietario y/o grupo', syntax: 'chown [opciones] usuario[:grupo] archivo', options: [{ flag: '-R', description: 'Recursivo' }, { flag: '-v', description: 'Muestra cambios' }], examples: [{ command: 'sudo chown usuario:grupo archivo.txt', explanation: 'Cambia propietario y grupo' }, { command: 'sudo chown usuario archivo.txt', explanation: 'Cambia solo propietario' }, { command: 'sudo chown -R usuario:grupo carpeta/', explanation: 'Cambia recursivamente' }], moduleId: 'seguridad' },
  { name: 'chgrp', category: 'Seguridad', description: 'Cambia el grupo de un archivo', syntax: 'chgrp [opciones] grupo archivo', options: [{ flag: '-R', description: 'Recursivo' }], examples: [{ command: 'sudo chgrp devs archivo.txt', explanation: 'Cambia el grupo a devs' }], moduleId: 'seguridad' },
  { name: 'sudo', category: 'Seguridad', description: 'Ejecuta como superusuario', syntax: 'sudo comando', options: [], examples: [{ command: 'sudo apt update', explanation: 'Actualiza paquetes como root' }, { command: 'sudo ls /root', explanation: 'Lista directorio de root' }], moduleId: 'seguridad' },
  { name: 'su', category: 'Seguridad', description: 'Cambia de usuario', syntax: 'su [usuario]', options: [{ flag: '-', description: 'Carga el entorno del usuario' }], examples: [{ command: 'su -', explanation: 'Cambia a root con su entorno' }, { command: 'su - usuario', explanation: 'Cambia a otro usuario' }], moduleId: 'seguridad' },
  { name: 'adduser', category: 'Seguridad', description: 'Crea un nuevo usuario (interactivo)', syntax: 'sudo adduser nombre', options: [], examples: [{ command: 'sudo adduser alumno1', explanation: 'Crea usuario con home y pide datos interactivamente' }], moduleId: 'seguridad' },
  { name: 'useradd', category: 'Seguridad', description: 'Crea usuario (bajo nivel)', syntax: 'sudo useradd [opciones] nombre', options: [{ flag: '-m', description: 'Crea directorio home' }, { flag: '-s', description: 'Especifica shell' }], examples: [{ command: 'sudo useradd -m -s /bin/bash nombreusuario', explanation: 'Crea usuario con home y bash' }], moduleId: 'seguridad' },
  { name: 'usermod', category: 'Seguridad', description: 'Modifica un usuario', syntax: 'sudo usermod [opciones] usuario', options: [{ flag: '-aG', description: 'Añade a grupo (sin quitar otros)' }, { flag: '-L', description: 'Bloquea cuenta' }, { flag: '-U', description: 'Desbloquea cuenta' }], examples: [{ command: 'sudo usermod -aG sudo usuario', explanation: 'Añade usuario al grupo sudo' }, { command: 'sudo usermod -L usuario', explanation: 'Bloquea cuenta de usuario' }], moduleId: 'seguridad' },
  { name: 'userdel', category: 'Seguridad', description: 'Elimina un usuario', syntax: 'sudo userdel [opciones] usuario', options: [{ flag: '-r', description: 'Elimina también el home' }], examples: [{ command: 'sudo userdel -r nombreusuario', explanation: 'Elimina usuario y su home' }], moduleId: 'seguridad' },
  { name: 'passwd', category: 'Seguridad', description: 'Cambia contraseña', syntax: 'sudo passwd [usuario]', options: [], examples: [{ command: 'sudo passwd alumno1', explanation: 'Cambia contraseña del usuario' }], moduleId: 'seguridad' },
  { name: 'groupadd', category: 'Seguridad', description: 'Crea un grupo', syntax: 'sudo groupadd nombre', options: [], examples: [{ command: 'sudo groupadd devs', explanation: 'Crea el grupo devs' }], moduleId: 'seguridad' },
  { name: 'groupdel', category: 'Seguridad', description: 'Elimina un grupo', syntax: 'sudo groupdel nombre', options: [], examples: [{ command: 'sudo groupdel devs', explanation: 'Elimina el grupo devs' }], moduleId: 'seguridad' },
  { name: 'umask', category: 'Seguridad', description: 'Muestra/establece máscara de permisos', syntax: 'umask [valor]', options: [], examples: [{ command: 'umask', explanation: 'Muestra la umask actual' }, { command: 'umask 022', explanation: 'Establece umask a 022' }], moduleId: 'seguridad' },
  { name: 'getent', category: 'Seguridad', description: 'Obtiene entradas de bases de datos', syntax: 'getent base_dato clave', options: [], examples: [{ command: 'getent passwd usuario', explanation: 'Muestra información del usuario' }], moduleId: 'seguridad' },
  
  // ===== ADMINISTRACIÓN =====
  { name: 'ps', category: 'Admin', description: 'Muestra procesos', syntax: 'ps [opciones]', options: [{ flag: 'aux', description: 'Todos los procesos con detalles' }, { flag: 'ef', description: 'Formato completo' }], examples: [{ command: 'ps aux', explanation: 'Lista todos los procesos' }, { command: 'ps aux | grep nombre', explanation: 'Busca proceso por nombre' }], moduleId: 'admin-tareas' },
  { name: 'top', category: 'Admin', description: 'Monitor de procesos en tiempo real', syntax: 'top', options: [], examples: [{ command: 'top', explanation: 'q para salir, k para matar proceso, M ordenar por memoria' }], moduleId: 'admin-tareas' },
  { name: 'htop', category: 'Admin', description: 'Monitor interactivo mejorado (si está instalado)', syntax: 'htop', options: [], examples: [{ command: 'htop', explanation: 'Monitor más visual que top' }], moduleId: 'admin-tareas' },
  { name: 'kill', category: 'Admin', description: 'Envía señal a un proceso', syntax: 'kill [opciones] PID', options: [{ flag: '-9', description: 'SIGKILL - fuerza el cierre' }, { flag: '-15', description: 'SIGTERM - termina ordenadamente' }], examples: [{ command: 'kill 1234', explanation: 'Envía SIGTERM al proceso 1234' }, { command: 'kill -9 1234', explanation: 'Fuerza cierre del proceso 1234' }], moduleId: 'admin-tareas' },
  { name: 'pkill', category: 'Admin', description: 'Mata procesos por nombre', syntax: 'pkill [opciones] nombre', options: [], examples: [{ command: 'pkill firefox', explanation: 'Mata todos los procesos firefox' }], safetyNote: '¡Cuidado! Mata todos los procesos con ese nombre', moduleId: 'admin-tareas' },
  { name: 'df', category: 'Admin', description: 'Espacio libre en sistemas de archivos', syntax: 'df [opciones]', options: [{ flag: '-h', description: 'Tamaños legibles (human)' }, { flag: '-T', description: 'Muestra tipo de sistema de archivos' }], examples: [{ command: 'df -h', explanation: 'Muestra espacio libre en discos' }, { command: 'df -h .', explanation: 'Espacio del sistema de archivos actual' }], moduleId: 'admin-tareas' },
  { name: 'du', category: 'Admin', description: 'Uso de espacio de archivos y directorios', syntax: 'du [opciones] [ruta]', options: [{ flag: '-sh', description: 'Resumen legible de directorio' }, { flag: '-h', description: 'Tamaños legibles' }, { flag: '-a', description: 'Muestra archivos, no solo directorios' }, { flag: '--max-depth=N', description: 'Profundidad máxima' }], examples: [{ command: 'du -sh carpeta/', explanation: 'Tamaño total de la carpeta' }, { command: 'du -sh *', explanation: 'Tamaño de cada elemento en la carpeta actual' }], moduleId: 'admin-tareas' },
  { name: 'lscpu', category: 'Admin', description: 'Información de CPU', syntax: 'lscpu', options: [], examples: [{ command: 'lscpu', explanation: 'Muestra arquitectura, núcleos, threads' }], moduleId: 'admin-tareas' },
  { name: 'free', category: 'Admin', description: 'Memoria RAM y swap', syntax: 'free [opciones]', options: [{ flag: '-h', description: 'Tamaños legibles' }], examples: [{ command: 'free -h', explanation: 'Muestra memoria en formato legible' }], moduleId: 'admin-tareas' },
  { name: 'uptime', category: 'Admin', description: 'Tiempo encendido y carga media', syntax: 'uptime', options: [], examples: [{ command: 'uptime', explanation: 'Muestra tiempo activo y carga de CPU' }], moduleId: 'admin-tareas' },
  { name: 'lsblk', category: 'Admin', description: 'Lista dispositivos de bloques', syntax: 'lsblk [opciones]', options: [{ flag: '-f', description: 'Muestra sistemas de archivos' }], examples: [{ command: 'lsblk', explanation: 'Muestra discos y particiones' }], moduleId: 'admin-tareas' },
  
  // ===== RED =====
  { name: 'ip', category: 'Red', description: 'Muestra/configura interfaces de red', syntax: 'ip [comando]', options: [], examples: [{ command: 'ip a', explanation: 'Muestra interfaces y direcciones IP' }, { command: 'ip r', explanation: 'Muestra tabla de rutas' }], moduleId: 'admin-tareas' },
  { name: 'ping', category: 'Red', description: 'Prueba conectividad de red', syntax: 'ping [opciones] destino', options: [{ flag: '-c N', description: 'Envía N paquetes' }], examples: [{ command: 'ping -c 4 8.8.8.8', explanation: 'Envía 4 pings a Google DNS' }, { command: 'ping -c 4 google.com', explanation: 'Prueba resolución DNS' }], moduleId: 'admin-tareas' },
  
  // ===== COMPRESIÓN =====
  { name: 'tar', category: 'Compresión', description: 'Empaqueta archivos', syntax: 'tar [opciones] archivo [ficheros]', options: [{ flag: '-c', description: 'Crear archivo' }, { flag: '-x', description: 'Extraer' }, { flag: '-v', description: 'Verbose' }, { flag: '-f', description: 'Especifica archivo' }, { flag: '-z', description: 'Comprimir con gzip' }, { flag: '-j', description: 'Comprimir con bzip2' }], examples: [{ command: 'tar -czvf backup.tar.gz carpeta/', explanation: 'Comprime carpeta con gzip' }, { command: 'tar -xzvf backup.tar.gz', explanation: 'Extrae archivo gzip' }, { command: 'tar -cvf entrega.tar carpeta', explanation: 'Crea tar sin comprimir' }, { command: 'tar -xvf entrega.tar', explanation: 'Extrae tar' }], moduleId: 'admin-tareas' },
  { name: 'zip', category: 'Compresión', description: 'Comprime archivos en formato zip', syntax: 'zip [opciones] archivo.zip ficheros', options: [{ flag: '-r', description: 'Recursivo' }], examples: [{ command: 'zip -r entrega.zip carpeta/', explanation: 'Comprime carpeta en zip' }], moduleId: 'admin-tareas' },
  { name: 'unzip', category: 'Compresión', description: 'Extrae archivos zip', syntax: 'unzip archivo.zip', options: [], examples: [{ command: 'unzip entrega.zip', explanation: 'Extrae archivo zip' }], moduleId: 'admin-tareas' },
  { name: 'gzip', category: 'Compresión', description: 'Comprime archivos con gzip', syntax: 'gzip [opciones] archivo', options: [{ flag: '-d', description: 'Descomprimir' }, { flag: '-k', description: 'Mantiene archivo original' }], examples: [{ command: 'gzip archivo.txt', explanation: 'Comprime archivo.txt a archivo.txt.gz' }, { command: 'gzip -d archivo.txt.gz', explanation: 'Descomprime' }], moduleId: 'admin-tareas' },
  
  // ===== CRON =====
  { name: 'crontab', category: 'Cron', description: 'Gestiona tareas programadas', syntax: 'crontab [opciones]', options: [{ flag: '-e', description: 'Editar crontab' }, { flag: '-l', description: 'Listar tareas' }, { flag: '-r', description: 'Eliminar todas las tareas' }], examples: [{ command: 'crontab -e', explanation: 'Edita las tareas programadas' }, { command: 'crontab -l', explanation: 'Muestra las tareas actuales' }], moduleId: 'admin-tareas' },
  
  // ===== MONTAJE =====
  { name: 'mount', category: 'Montaje', description: 'Monta sistemas de archivos', syntax: 'mount [opciones] dispositivo punto_montaje', options: [], examples: [{ command: 'sudo mount /dev/sdb1 /mnt', explanation: 'Monta partición en /mnt' }], moduleId: 'admin-tareas' },
  { name: 'umount', category: 'Montaje', description: 'Desmonta sistemas de archivos', syntax: 'umount punto_montaje', options: [], examples: [{ command: 'sudo umount /mnt', explanation: 'Desmonta /mnt' }], moduleId: 'admin-tareas' },
  { name: 'findmnt', category: 'Montaje', description: 'Muestra montajes de forma jerárquica', syntax: 'findmnt', options: [], examples: [{ command: 'findmnt', explanation: 'Muestra todos los montajes' }], moduleId: 'admin-tareas' },
  
  // ===== VARIABLES DE ENTORNO =====
  { name: 'env', category: 'Variables', description: 'Muestra todas las variables de entorno', syntax: 'env', options: [], examples: [{ command: 'env', explanation: 'Lista todas las variables' }], moduleId: 'admin-tareas' },
  { name: 'export', category: 'Variables', description: 'Crea o modifica variable de entorno', syntax: 'export NOMBRE=valor', options: [], examples: [{ command: 'export APP_ENV=dev', explanation: 'Crea variable APP_ENV' }, { command: 'export PATH="$PATH:/nueva/ruta"', explanation: 'Añade ruta al PATH' }], moduleId: 'admin-tareas' },
  { name: 'unset', category: 'Variables', description: 'Elimina variable de entorno', syntax: 'unset NOMBRE', options: [], examples: [{ command: 'unset APP_ENV', explanation: 'Elimina la variable APP_ENV' }], moduleId: 'admin-tareas' },
  { name: 'echo', category: 'Variables', description: 'Muestra texto o valor de variable', syntax: 'echo [texto]', options: [{ flag: '$VAR', description: 'Muestra valor de variable' }], examples: [{ command: 'echo "$HOME"', explanation: 'Muestra el home del usuario' }, { command: 'echo "$PATH"', explanation: 'Muestra el PATH' }, { command: 'echo "$?"', explanation: 'Muestra código de salida del último comando' }], moduleId: 'admin-tareas' },
  { name: 'source', category: 'Variables', description: 'Ejecuta comandos del archivo en shell actual', syntax: 'source archivo', options: [], examples: [{ command: 'source ~/.bashrc', explanation: 'Recarga configuración de bash' }], moduleId: 'modo-comando' },
  
  // ===== PAQUETES =====
  { name: 'apt', category: 'Paquetes', description: 'Gestión de paquetes Debian/Ubuntu', syntax: 'apt [comando] [paquete]', options: [], examples: [{ command: 'sudo apt update', explanation: 'Actualiza lista de paquetes' }, { command: 'sudo apt upgrade', explanation: 'Actualiza paquetes instalados' }, { command: 'sudo apt install nombre', explanation: 'Instala paquete' }, { command: 'sudo apt remove nombre', explanation: 'Desinstala paquete' }, { command: 'sudo apt purge nombre', explanation: 'Desinstala y elimina configuración' }, { command: 'apt search nombre', explanation: 'Busca paquete' }, { command: 'apt show nombre', explanation: 'Muestra información del paquete' }], moduleId: 'admin-tareas' },
  
  // ===== ENLACES =====
  { name: 'ln', category: 'Enlaces', description: 'Crea enlaces entre archivos', syntax: 'ln [opciones] origen [destino]', options: [{ flag: '-s', description: 'Crea enlace simbólico' }], examples: [{ command: 'ln -s /ruta/origen enlace', explanation: 'Crea enlace simbólico' }, { command: 'ln archivo hardlink', explanation: 'Crea enlace duro' }], moduleId: 'estructura-fhs' },
  
  // ===== BÚSQUEDA =====
  { name: 'which', category: 'Búsqueda', description: 'Localiza el ejecutable de un comando', syntax: 'which comando', options: [], examples: [{ command: 'which python', explanation: 'Muestra: /usr/bin/python' }], moduleId: 'modo-comando' },
  { name: 'command', category: 'Búsqueda', description: 'Ejecuta o localiza comandos', syntax: 'command [-v] comando', options: [{ flag: '-v', description: 'Muestra ruta del comando' }], examples: [{ command: 'command -v python', explanation: 'Muestra ruta de python' }], moduleId: 'modo-comando' },
  { name: 'type', category: 'Búsqueda', description: 'Indica cómo se interpretaría el comando', syntax: 'type comando', options: [], examples: [{ command: 'type python', explanation: 'Muestra si es builtin, alias o ejecutable' }], moduleId: 'modo-comando' },
  
  // ===== TRABAJOS EN SEGUNDO PLANO =====
  { name: 'jobs', category: 'Trabajos', description: 'Lista trabajos en segundo plano', syntax: 'jobs', options: [], examples: [{ command: 'jobs', explanation: 'Muestra trabajos activos' }], moduleId: 'admin-tareas' },
  { name: 'fg', category: 'Trabajos', description: 'Trae trabajo al primer plano', syntax: 'fg [%número]', options: [], examples: [{ command: 'fg', explanation: 'Trae el último trabajo' }, { command: 'fg %1', explanation: 'Trae el trabajo número 1' }], moduleId: 'admin-tareas' },
  { name: 'bg', category: 'Trabajos', description: 'Continúa trabajo en segundo plano', syntax: 'bg [%número]', options: [], examples: [{ command: 'bg', explanation: 'Continúa trabajo suspendido en background' }], moduleId: 'admin-tareas' },
  
  // ===== ÁRBOL =====
  { name: 'tree', category: 'Árbol', description: 'Muestra estructura de directorios en forma de árbol', syntax: 'tree [opciones] [directorio]', options: [{ flag: '-L N', description: 'Nivel máximo de profundidad' }, { flag: '-a', description: 'Muestra archivos ocultos' }], examples: [{ command: 'tree', explanation: 'Muestra árbol del directorio actual' }, { command: 'tree -L 2', explanation: 'Árbol con profundidad máxima 2' }], moduleId: 'comandos-basicos' }
];

// Glossary terms - Extended with all terms from PDFs
export const glossary: GlossaryTerm[] = [
  // ===== CONCEPTOS BÁSICOS =====
  { term: 'Terminal', definition: 'Aplicación o ventana donde escribes comandos (GNOME Terminal, Konsole, Windows Terminal)', moduleId: 'modo-comando' },
  { term: 'Consola', definition: 'Entorno de texto, hoy suele estar dentro de una terminal gráfica', moduleId: 'modo-comando' },
  { term: 'Shell', definition: 'Programa que interpreta tus comandos (bash, zsh). Controla variables, alias, autocompletado, redirecciones y tuberías', moduleId: 'modo-comando' },
  { term: 'Bash', definition: 'Bourne Again Shell - shell por defecto en la mayoría de distribuciones Linux', moduleId: 'modo-comando' },
  { term: 'Zsh', definition: 'Z Shell - shell alternativa con más características', moduleId: 'modo-comando' },
  { term: 'Prompt', definition: 'Lo que ves antes de escribir: usuario@equipo:directorio$. $ = usuario normal, # = root', moduleId: 'modo-comando' },
  { term: 'Comando', definition: 'Instrucción que se ejecuta en la terminal', moduleId: 'modo-comando' },
  { term: 'Opción (flag)', definition: 'Modificador de un comando, suele empezar con - o --', moduleId: 'modo-comando' },
  { term: 'Argumento', definition: 'Dato que se pasa a un comando (archivos, directorios, etc.)', moduleId: 'modo-comando' },
  
  // ===== AYUDA Y DOCUMENTACIÓN =====
  { term: 'Man page', definition: 'Página del manual - documentación oficial de comandos', moduleId: 'modo-comando' },
  { term: 'Info page', definition: 'Documentación alternativa, a veces más completa que man', moduleId: 'modo-comando' },
  { term: 'Apropos', definition: 'Busca comandos por palabra clave en las descripciones de manuales', moduleId: 'modo-comando' },
  
  // ===== HISTORIAL Y PRODUCTIVIDAD =====
  { term: 'Historial', definition: 'Lista de comandos ejecutados anteriormente', moduleId: 'modo-comando' },
  { term: 'Alias', definition: 'Atajo que sustituye una palabra por un comando más largo', moduleId: 'modo-comando' },
  { term: 'Autocompletado', definition: 'Presionar Tab para completar comandos y rutas automáticamente', moduleId: 'modo-comando' },
  { term: 'PATH', definition: 'Lista de rutas donde la shell busca ejecutables cuando escribes un comando', moduleId: 'modo-comando' },
  { term: 'Código de salida', definition: 'Número que devuelve un comando al terminar. 0 = éxito, otro = error', moduleId: 'modo-comando' },
  { term: 'Variable de shell', definition: 'Valor almacenado que puede usarse en comandos', moduleId: 'modo-comando' },
  
  // ===== SISTEMA DE ARCHIVOS =====
  { term: 'FHS', definition: 'Filesystem Hierarchy Standard - jerarquía estándar de directorios en Linux', moduleId: 'estructura-fhs' },
  { term: 'Raíz (/)', definition: 'Directorio raíz del sistema, inicio de toda la jerarquía', moduleId: 'estructura-fhs' },
  { term: 'Home (~)', definition: 'Directorio personal del usuario', moduleId: 'estructura-fhs' },
  { term: 'Archivo oculto', definition: 'Archivo que empieza con punto (.), no se muestra en listados normales', moduleId: 'estructura-fhs' },
  { term: 'Enlace simbólico', definition: 'Atajo a otro archivo o directorio, como un acceso directo', moduleId: 'estructura-fhs' },
  { term: 'Enlace duro', definition: 'Segundo nombre para el mismo archivo (mismo inodo)', moduleId: 'estructura-fhs' },
  { term: 'Inodo', definition: 'Estructura de datos que contiene metadatos de un archivo', moduleId: 'estructura-fhs' },
  { term: 'Metadatos', definition: 'Información sobre un archivo: permisos, propietario, fechas, tamaño', moduleId: 'estructura-fhs' },
  { term: 'Dispositivo', definition: 'En Linux, los dispositivos de hardware se representan como archivos en /dev', moduleId: 'estructura-fhs' },
  { term: 'Pseudoarchivo', definition: 'Archivo virtual que no existe en disco, como los de /proc', moduleId: 'estructura-fhs' },
  
  // ===== DIRECTORIOS IMPORTANTES =====
  { term: '/bin', definition: 'Comandos esenciales del sistema', moduleId: 'estructura-fhs' },
  { term: '/sbin', definition: 'Comandos de administración del sistema', moduleId: 'estructura-fhs' },
  { term: '/etc', definition: 'Archivos de configuración del sistema', moduleId: 'estructura-fhs' },
  { term: '/var', definition: 'Datos variables: logs, colas, bases de datos', moduleId: 'estructura-fhs' },
  { term: '/var/log', definition: 'Archivos de registro (logs) del sistema y aplicaciones', moduleId: 'estructura-fhs' },
  { term: '/tmp', definition: 'Archivos temporales', moduleId: 'estructura-fhs' },
  { term: '/usr', definition: 'Programas y librerías instalados por el sistema', moduleId: 'estructura-fhs' },
  { term: '/opt', definition: 'Software opcional o de terceros', moduleId: 'estructura-fhs' },
  { term: '/dev', definition: 'Dispositivos del sistema', moduleId: 'estructura-fhs' },
  { term: '/proc', definition: 'Pseudoarchivos del kernel con información del sistema', moduleId: 'estructura-fhs' },
  { term: '/root', definition: 'Directorio home del usuario root', moduleId: 'estructura-fhs' },
  { term: '/home', definition: 'Directorios personales de los usuarios', moduleId: 'estructura-fhs' },
  { term: '/mnt', definition: 'Punto de montaje temporal', moduleId: 'estructura-fhs' },
  { term: '/media', definition: 'Punto de montaje para dispositivos removibles', moduleId: 'estructura-fhs' },
  
  // ===== RUTAS =====
  { term: 'Ruta absoluta', definition: 'Empieza desde la raíz "/", no depende de dónde estás', moduleId: 'rutas' },
  { term: 'Ruta relativa', definition: 'Depende del directorio actual', moduleId: 'rutas' },
  { term: 'Directorio actual (.)', definition: 'Punto representa el directorio donde estás', moduleId: 'rutas' },
  { term: 'Directorio padre (..)', definition: 'Dos puntos representan el directorio superior', moduleId: 'rutas' },
  { term: 'Home (~)', definition: 'Virgulilla representa el directorio personal del usuario', moduleId: 'rutas' },
  { term: 'Globbing', definition: 'Patrones que interpreta la shell para expandir nombres de archivos', moduleId: 'rutas' },
  { term: 'Wildcard (*)', definition: 'Asterisco - coincide con cualquier cadena de caracteres', moduleId: 'rutas' },
  { term: 'Wildcard (?)', definition: 'Interrogación - coincide con un solo carácter', moduleId: 'rutas' },
  { term: 'Wildcard ([])', definition: 'Corchetes - coincide con cualquier carácter del conjunto', moduleId: 'rutas' },
  { term: 'Wildcard ({})', definition: 'Llaves - expansiones alternativas', moduleId: 'rutas' },
  
  // ===== REDIRECCIÓN =====
  { term: 'stdin', definition: 'Entrada estándar (0) - lo que el programa lee', moduleId: 'redireccionamiento' },
  { term: 'stdout', definition: 'Salida estándar (1) - lo que ves cuando todo va bien', moduleId: 'redireccionamiento' },
  { term: 'stderr', definition: 'Error estándar (2) - mensajes de fallo o advertencias', moduleId: 'redireccionamiento' },
  { term: 'Redirección', definition: 'Cambiar de dónde lee o a dónde escribe un comando', moduleId: 'redireccionamiento' },
  { term: 'Tubería (pipe)', definition: 'Operador | que manda salida de un comando como entrada del siguiente', moduleId: 'redireccionamiento' },
  { term: 'Pipeline', definition: 'Cadena de comandos conectados con tuberías', moduleId: 'redireccionamiento' },
  { term: 'Here document', definition: 'Redirección que permite pasar múltiples líneas como entrada', moduleId: 'redireccionamiento' },
  
  // ===== PERMISOS =====
  { term: 'Permisos rwx', definition: 'r=lectura, w=escritura, x=ejecución', moduleId: 'seguridad' },
  { term: 'Propietario (user)', definition: 'Usuario dueño del archivo', moduleId: 'seguridad' },
  { term: 'Grupo (group)', definition: 'Grupo al que pertenece el archivo', moduleId: 'seguridad' },
  { term: 'Otros (others)', definition: 'Resto de usuarios del sistema', moduleId: 'seguridad' },
  { term: 'Modo numérico', definition: 'Notación octal para permisos (ej: 755, 644)', moduleId: 'seguridad' },
  { term: 'Modo simbólico', definition: 'Notación con letras para permisos (ej: u+x, g-w)', moduleId: 'seguridad' },
  { term: 'umask', definition: 'Máscara que define qué permisos se quitan por defecto al crear archivos', moduleId: 'seguridad' },
  { term: 'setuid', definition: 'Bit especial que ejecuta archivo con permisos del propietario', moduleId: 'seguridad' },
  { term: 'setgid', definition: 'Bit que hace que archivos nuevos hereden el grupo del directorio', moduleId: 'seguridad' },
  { term: 'Sticky bit', definition: 'Bit que impide que usuarios borren archivos de otros', moduleId: 'seguridad' },
  
  // ===== USUARIOS =====
  { term: 'Usuario', definition: 'Cuenta individual en el sistema', moduleId: 'seguridad' },
  { term: 'Root', definition: 'Superusuario con todos los permisos', moduleId: 'seguridad' },
  { term: 'Grupo', definition: 'Conjunto de usuarios para compartir permisos', moduleId: 'seguridad' },
  { term: 'UID', definition: 'User ID - identificador numérico del usuario', moduleId: 'seguridad' },
  { term: 'GID', definition: 'Group ID - identificador numérico del grupo', moduleId: 'seguridad' },
  { term: 'sudo', definition: 'Superuser do - ejecuta comandos como root', moduleId: 'seguridad' },
  { term: 'su', definition: 'Switch user - cambia a otro usuario', moduleId: 'seguridad' },
  { term: 'Contraseña', definition: 'Clave de acceso del usuario', moduleId: 'seguridad' },
  { term: '/etc/passwd', definition: 'Archivo con información de usuarios', moduleId: 'seguridad' },
  { term: '/etc/shadow', definition: 'Archivo con contraseñas cifradas', moduleId: 'seguridad' },
  { term: '/etc/group', definition: 'Archivo con información de grupos', moduleId: 'seguridad' },
  
  // ===== PROCESOS =====
  { term: 'Proceso', definition: 'Programa en ejecución', moduleId: 'admin-tareas' },
  { term: 'PID', definition: 'Process ID - identificador único del proceso', moduleId: 'admin-tareas' },
  { term: 'PPID', definition: 'Parent PID - identificador del proceso padre', moduleId: 'admin-tareas' },
  { term: 'Señal', definition: 'Mensaje que se envía a un proceso (SIGTERM, SIGKILL)', moduleId: 'admin-tareas' },
  { term: 'SIGTERM', definition: 'Señal 15 - pide al proceso que termine ordenadamente', moduleId: 'admin-tareas' },
  { term: 'SIGKILL', definition: 'Señal 9 - fuerza el cierre del proceso inmediatamente', moduleId: 'admin-tareas' },
  { term: 'Background', definition: 'Proceso ejecutándose en segundo plano', moduleId: 'admin-tareas' },
  { term: 'Foreground', definition: 'Proceso ejecutándose en primer plano', moduleId: 'admin-tareas' },
  { term: 'Zombie', definition: 'Proceso que ha terminado pero su padre no ha leído su código de salida', moduleId: 'admin-tareas' },
  { term: 'Daemon', definition: 'Proceso que corre en segundo plano como servicio', moduleId: 'admin-tareas' },
  
  // ===== SISTEMA =====
  { term: 'CPU', definition: 'Unidad Central de Procesamiento', moduleId: 'admin-tareas' },
  { term: 'RAM', definition: 'Memoria de acceso aleatorio', moduleId: 'admin-tareas' },
  { term: 'Swap', definition: 'Espacio en disco usado como memoria virtual', moduleId: 'admin-tareas' },
  { term: 'Disco', definition: 'Dispositivo de almacenamiento', moduleId: 'admin-tareas' },
  { term: 'Partición', definition: 'División lógica de un disco', moduleId: 'admin-tareas' },
  { term: 'Sistema de archivos', definition: 'Método de organización de archivos en un disco (ext4, xfs, etc.)', moduleId: 'admin-tareas' },
  { term: 'Montaje', definition: 'Hacer accesible un sistema de archivos en un directorio', moduleId: 'admin-tareas' },
  { term: 'Punto de montaje', definition: 'Directorio donde se monta un sistema de archivos', moduleId: 'admin-tareas' },
  { term: 'UUID', definition: 'Identificador único universal de un dispositivo', moduleId: 'admin-tareas' },
  
  // ===== RED =====
  { term: 'IP', definition: 'Dirección de protocolo de Internet', moduleId: 'admin-tareas' },
  { term: 'Interfaz de red', definition: 'Dispositivo de hardware para conectividad de red', moduleId: 'admin-tareas' },
  { term: 'Loopback', definition: 'Interfaz virtual localhost (127.0.0.1)', moduleId: 'admin-tareas' },
  { term: 'DNS', definition: 'Domain Name System - traduce nombres a direcciones IP', moduleId: 'admin-tareas' },
  { term: 'Gateway', definition: 'Puerta de enlace - router por defecto', moduleId: 'admin-tareas' },
  { term: 'Ping', definition: 'Herramienta para probar conectividad de red', moduleId: 'admin-tareas' },
  { term: 'Latencia', definition: 'Tiempo que tarda un paquete en ir y volver', moduleId: 'admin-tareas' },
  
  // ===== CRON =====
  { term: 'Cron', definition: 'Planificador de tareas que ejecuta comandos a horas concretas', moduleId: 'admin-tareas' },
  { term: 'Crontab', definition: 'Archivo de configuración de tareas cron', moduleId: 'admin-tareas' },
  { term: 'Tarea programada', definition: 'Comando configurado para ejecutarse automáticamente', moduleId: 'admin-tareas' },
  { term: 'Minuto', definition: 'Campo de cron (0-59)', moduleId: 'admin-tareas' },
  { term: 'Hora', definition: 'Campo de cron (0-23)', moduleId: 'admin-tareas' },
  { term: 'Día del mes', definition: 'Campo de cron (1-31)', moduleId: 'admin-tareas' },
  { term: 'Mes', definition: 'Campo de cron (1-12)', moduleId: 'admin-tareas' },
  { term: 'Día de la semana', definition: 'Campo de cron (0-7, 0 y 7 son domingo)', moduleId: 'admin-tareas' },
  
  // ===== VARIABLES =====
  { term: 'Variable de entorno', definition: 'Variable que afecta a cómo se ejecutan programas', moduleId: 'admin-tareas' },
  { term: 'HOME', definition: 'Variable con la ruta del directorio personal', moduleId: 'admin-tareas' },
  { term: 'USER', definition: 'Variable con el nombre del usuario actual', moduleId: 'admin-tareas' },
  { term: 'SHELL', definition: 'Variable con la ruta de la shell actual', moduleId: 'admin-tareas' },
  { term: 'LANG', definition: 'Variable con el idioma y localización', moduleId: 'admin-tareas' },
  { term: 'EDITOR', definition: 'Variable con el editor de texto por defecto', moduleId: 'admin-tareas' },
  { term: 'PWD', definition: 'Variable con el directorio actual', moduleId: 'admin-tareas' },
  { term: 'OLDPWD', definition: 'Variable con el directorio anterior', moduleId: 'admin-tareas' },
  
  // ===== PAQUETES =====
  { term: 'Paquete', definition: 'Archivo que contiene software para instalar', moduleId: 'admin-tareas' },
  { term: 'Repositorio', definition: 'Servidor con paquetes disponibles para instalar', moduleId: 'admin-tareas' },
  { term: 'Dependencia', definition: 'Paquete que necesita otro paquete para funcionar', moduleId: 'admin-tareas' },
  { term: 'APT', definition: 'Advanced Package Tool - gestor de paquetes Debian/Ubuntu', moduleId: 'admin-tareas' },
  { term: 'Cache', definition: 'Almacenamiento temporal de paquetes descargados', moduleId: 'admin-tareas' },
  
  // ===== COMPRESIÓN =====
  { term: 'Tar', definition: 'Tape Archive - formato de empaquetado', moduleId: 'admin-tareas' },
  { term: 'Gzip', definition: 'Compresión GNU zip', moduleId: 'admin-tareas' },
  { term: 'Bzip2', definition: 'Compresión Burrows-Wheeler', moduleId: 'admin-tareas' },
  { term: 'Zip', definition: 'Formato de compresión común', moduleId: 'admin-tareas' },
  { term: 'Archivo comprimido', definition: 'Archivo que ocupa menos espacio por compresión', moduleId: 'admin-tareas' },
  
  // ===== EDICIÓN =====
  { term: 'Editor de texto', definition: 'Programa para modificar archivos de texto', moduleId: 'editores' },
  { term: 'Modo normal (vim)', definition: 'Modo de vim para navegar y ejecutar comandos', moduleId: 'editores' },
  { term: 'Modo insertar (vim)', definition: 'Modo de vim para escribir texto', moduleId: 'editores' },
  { term: 'Modo comando (vim)', definition: 'Modo de vim para comandos como guardar o salir', moduleId: 'editores' },
  
  // ===== OTROS =====
  { term: 'Log', definition: 'Archivo de registro con eventos del sistema o aplicación', moduleId: 'visualizacion' },
  { term: 'Script', definition: 'Archivo con múltiples comandos que se pueden ejecutar', moduleId: 'modo-comando' },
  { term: 'Shebang', definition: 'Primera línea de script que indica el intérprete (#!/bin/bash)', moduleId: 'modo-comando' },
  { term: 'Kernel', definition: 'Núcleo del sistema operativo', moduleId: 'estructura-fhs' },
  { term: 'Distribución', definition: 'Versión de Linux con paquetes y configuración específica (Ubuntu, Debian, etc.)', moduleId: 'modo-comando' },
  { term: 'Open Source', definition: 'Software con código fuente disponible públicamente', moduleId: 'modo-comando' },
  { term: 'Licencia', definition: 'Términos legales de uso del software', moduleId: 'modo-comando' }
];

// Quick orientation checks
export const orientationChecks = [
  { command: 'pwd', description: '¿Dónde estoy?', example: '/home/usuario/proyecto' },
  { command: 'whoami', description: '¿Quién soy?', example: 'usuario' },
  { command: 'hostname', description: '¿En qué equipo?', example: 'mi-laptop' },
  { command: 'id', description: '¿Qué permisos tengo?', example: 'uid=1000(usuario) gid=1000(grupo)' }
];

// Learning path steps
export const learningPath = [
  { step: 1, title: 'Orientación', description: 'pwd, whoami, hostname, id', moduleId: 'modo-comando' },
  { step: 2, title: 'Rutas', description: 'Absolutas, relativas, ~, . / ..', moduleId: 'rutas' },
  { step: 3, title: 'Comandos', description: 'ls, cd, mkdir, cp, mv, rm', moduleId: 'comandos-basicos' },
  { step: 4, title: 'Editores', description: 'nano para cambios rápidos', moduleId: 'editores' },
  { step: 5, title: 'Redirección', description: '>, >>, |, grep, tee', moduleId: 'redireccionamiento' }
];
