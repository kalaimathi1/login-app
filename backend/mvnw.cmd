@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup script for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "MVNW_VERBOSE=false"
set "MVNW_REPOURL="

set "WRAPPER_DIR=%~dp0.mvn\wrapper"
set "WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%WRAPPER_DIR%\maven-wrapper.properties"

if not exist "%WRAPPER_PROPERTIES%" (
  echo [ERROR] Missing "%WRAPPER_PROPERTIES%".
  exit /b 1
)

if not exist "%WRAPPER_JAR%" (
  echo [ERROR] Missing "%WRAPPER_JAR%".
  echo        Download it from Maven Central or re-run wrapper setup.
  exit /b 1
)

set "JAVA_EXE="
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
if not defined JAVA_EXE (
  for /f "delims=" %%i in ('where java 2^>NUL') do (
    if not defined JAVA_EXE set "JAVA_EXE=%%i"
  )
)
if not defined JAVA_EXE (
  echo [ERROR] Java not found on PATH. Install JDK 17+ and/or set JAVA_HOME.
  exit /b 1
)

set MAVEN_OPTS=%MAVEN_OPTS%

"%JAVA_EXE%" %MAVEN_OPTS% -classpath "%WRAPPER_JAR%" -Dmaven.multiModuleProjectDirectory="%~dp0." org.apache.maven.wrapper.MavenWrapperMain %*
if errorlevel 1 exit /b 1

endlocal
