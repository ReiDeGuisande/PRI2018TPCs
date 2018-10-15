<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="quran/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                
                <body>
                    <a name="Top">
                        <h1 align="center"><xsl:value-of select="tstmt/titlepg/title"/></h1>
                    </a> 
                    <hr/>
                    <table width="100%">
                        <tr>
                            <td width="30%" valign="top">
                                <h2>Index</h2>
                                <ul>
                                    <xsl:apply-templates select="/tstmt/suracoll/sura" mode="index"/>
                                      
                                    
                                </ul>
                            </td>
                            <td width="70%" valign="top">
                                <xsl:apply-templates mode="body" select="tstmt"/>
                            </td>
                        </tr>
                    </table>
                    <h6 align="bottom">[<a href="#Top">Return to Top</a>]</h6>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/> <!-- Geração das páginas individuais -->
    </xsl:template>
    

    
    <!-- Templates para o índice -->
    <xsl:template match="sura" mode="index">
        <li>
            <a href="sura{count(preceding-sibling::*)+1}.html">
                <xsl:value-of select="bktlong"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o body -->
    
    <xsl:template match="text()" mode="body" priority="-1"/>
    
    <xsl:template match="titlepg" mode="body">
        <h5><xsl:value-of select="subtitle"/></h5>
    </xsl:template>
    
    <xsl:template match="preface" mode="body">
        <h2>Preface</h2>
        <h5><xsl:value-of select="ptitle"/></h5>
        <xsl:apply-templates select="p" mode="body"/>
    </xsl:template>
    
    <xsl:template match="p" mode="body">
        <p><xsl:value-of select="."/></p>
    </xsl:template>
    
    <!-- Templates para os suras -->
    
    
    <xsl:template match = "sura">
        <xsl:result-document href="quran/sura{count(preceding-sibling::*)+1}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                
                <body>
                    <h1>
                        <xsl:value-of select="bktlong"/>
                    </h1>
                    <br/>
                    <h4><xsl:value-of select="epigraph"/></h4>
                    <xsl:apply-templates mode="vers"/>
                    <h6>[<a href="index.html">Return to Index</a>]</h6>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="text()" mode="vers" priority="-1"/>
    
    <xsl:template match="v" mode="vers">
        <p><xsl:value-of select="."/></p>
    </xsl:template>

</xsl:stylesheet>