import subprocess

separador = "----------------"
shell = [
    "find",
    "/mnt/c/Program Files/Git/usr/share/vim/vim82/indent",
    "-perm",
    "-u=s",
    "-type",
    "f",
]
output = subprocess.run(
    (shell), capture_output=True, universal_newlines=True, text=True
)

command_output = output.stdout + "\n" + separador
print(command_output)
